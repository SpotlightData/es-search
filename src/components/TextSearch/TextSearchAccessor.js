import * as R from 'ramda';
import { StatefulAccessor, ValueState } from 'searchkit';

// import sid from 'shortid';

import { TextSearchQueryBuilder, formatText } from './TextSearchQueryBuilder';

// Because bools are stringified
const clearExtract = entry => ({ ...entry, exact: entry.exact === 'true' });

/*
	NOTE:
	If we have an id system for tracking flags
	The ids inside flag make it easier to search, however, they will spam query string
	They should be removed when stringifying, and unstringifying
*/
export class TextSearchAccessor extends StatefulAccessor {
	constructor(key, fields, flags) {
		super(key);
		this.state = new ValueState();
		this.fields = fields;
		this.flags = flags;
	}

	getState() {
		return this.state.getValue() || {};
	}

	getFlags() {
		return R.propOr([], 'flags', this.getState());
	}

	removeFlag(text, type) {
		this.updateState({
			flags: R.filter(entry => !(entry.text === text && entry.flag === type), this.getFlags()),
		});
	}

	setSearch(search) {
		this.updateState({ search });
	}

	updateState(newState) {
		this.state = R.pipe(
			R.mergeDeepRight(this.getState()),
			this.state.create.bind(this.state)
		)(newState);
	}

	addFlag(newFlag) {
		this.updateState({ flags: R.append(newFlag, this.getFlags()) });
	}

	addFilters = (search, flags, initialQuery) => {
		let query = initialQuery;
		// if (search && search.text.length !== 0) {
		// 	query = query.addSelectedFilter({
		// 		name: 'text',
		// 		value: search.text,
		// 		id: this.key,
		// 		remove: () => this.setSearch(undefined),
		// 	});
		// }
		if (flags && flags.length !== 0) {
			query = R.reduce(
				(q, entry) =>
					q.addSelectedFilter({
						name: this.flags[entry.flag].text,
						value: (entry.exact ? 'Exact phrase: ' : '') + formatText(entry.exact, entry.text),
						id: this.key,
						remove: () => this.removeFlag(entry.text, entry.flag),
					}),
				query,
				flags
			);
		}
		return query;
	};

	fromQueryObject(ob) {
		const value = ob[this.urlKey];
		if (!value) {
			return;
		}
		const search = value.search ? clearExtract(value.search) : undefined;
		const flags = value.flags ? value.flags.map(clearExtract) : undefined;
		this.state = this.state.setValue({ search, flags });
	}

	getQueryObject() {
		let val = this.state.getValue();
		return val
			? {
					[this.urlKey]: val,
			  }
			: {};
	}

	buildSharedQuery(initialQuery) {
		const { search, flags } = this.getState();
		const flagLength = R.pathOr(0, ['length'], flags);
		const textLength = R.pathOr(0, ['text', 'length'], search);
		if (flagLength === 0 && textLength === 0) {
			return initialQuery;
		}
		const stateQuery = TextSearchQueryBuilder(search, flags, this.fields);
		const query = initialQuery.addQuery(stateQuery);
		return this.addFilters(search, flags, query);
	}
}
