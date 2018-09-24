import * as R from 'ramda';
import { StatefulAccessor, ValueState } from 'searchkit';

// import sid from 'shortid';

import { TextSearchQueryBuilder } from './TextSearchQueryBuilder';

const defaultSearch = { text: '', exact: false };
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
		this.fromQueryObject({});
	}

	getCleanState() {
		return this.state.getValue() || {};
	}

	getFlags() {
		return R.propOr([], 'flags', this.getCleanState());
	}

	removeFlag(text, type) {
		this.updateState({
			flags: R.filter(entry => entry.text !== text && entry.flag !== type, this.getFlags()),
		});
	}

	setSearch(search) {
		this.updateState({ search });
	}

	updateState(newState) {
		this.state = R.pipe(
			R.mergeDeepRight(this.getCleanState()),
			this.state.create.bind(this.state)
		)(newState);
	}

	addFlag(newFlag) {
		this.updateState({ flags: R.append(newFlag, this.getFlags()) });
	}

	addFilters = (state, initialQuery) => {
		const query = R.reduce(
			(query, entry) =>
				query.addSelectedFilter({
					name: this.flags[entry.flag].text,
					value: entry.text,
					id: this.key,
					remove: () => this.removeFlag(entry.text, entry.flag),
				}),
			initialQuery,
			state.flags
		);
		if (state.search.text.length !== 0) {
			return query.addSelectedFilter({
				name: 'SEARCH',
				value: this.getCleanState().search.text,
				id: this.key,
				remove: () => this.setSearch({ search: { text: '', exact: false } }),
			});
		}
		return query;
	};

	fromQueryObject(ob) {
		const value = ob[this.urlKey];
		const search = R.propOr(defaultSearch, 'search', value);
		const flags = R.propOr([], 'flags', value);
		this.state = this.state.setValue({ search, flags });
	}

	buildSharedQuery(initialQuery) {
		const state = this.state.getValue();
		if (!state) {
			return initialQuery;
		}
		debugger;
		const stateQuery = TextSearchQueryBuilder(state, this.fields);
		const query = initialQuery.addQuery(stateQuery);
		return this.addFilters(state, query);
	}
}
