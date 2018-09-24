import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';

import { Row, Col, Button, Input, Checkbox } from 'antd';
import { SearchkitComponent } from 'searchkit';

import { Dropdown } from '@spotlightdata/nanowire-extensions/lib/components/form/Dropdown';

import throttle from 'lodash.throttle';

import { TextSearchAccessor } from './TextSearchAccessor';

const firstEntry = obj => Object.values(obj)[0];

const ENTER_KEY = 13;

export class TextSearch extends SearchkitComponent {
	static propTypes = {
		fields: arrayOf(string),
		placeholder: string,
		flags: shape({}),
		key: string,
		throttle: number,
	};

	static defaultProps = {
		fields: ['jsonLD.text'],
		placeholder: 'Search text',
		flags: {
			'+': {
				key: '+',
				text: 'AND',
			},
			'|': {
				key: '|',
				text: 'OR',
			},
		},
		key: 'text_search',
		throttle: 600,
	};

	constructor(props) {
		super(props);
		this.updateAccessor = throttle(this.updateAccessorFn, props.throttle);
	}

	state = { text: '', exact: false, activeFlag: undefined, loaded: false };

	componentDidUpdate(_prevProps, prevState) {
		const newExact = this.state.exact !== prevState.exact;
		if (newExact) {
			this.updateAccessor();
		}
		// This is an alternative method to using forceupdate
		// Only need to load once
		const { search } = this.accessor.getState();
		if (!this.state.loaded && search) {
			this.setState({ ...search, loaded: true });
		}
	}

	defineAccessor() {
		return new TextSearchAccessor(this.props.key, this.props.fields, this.props.flags);
	}

	updateAccessorFn = flag => {
		const { text, exact } = this.state;
		// TODO throw warning if search is empty, and no flag is passed,
		// Pass as meta to search
		if (flag !== undefined) {
			this.accessor.addFlag(flag);
		}
		const newSearch =
			text.length === 0
				? undefined
				: {
						exact,
						text: text,
				  };

		this.accessor.setSearch(newSearch);
		this.searchkit.performSearch();
	};

	toggleExact = e => this.setState({ exact: e.target.checked });

	updateInput = e => this.setState({ text: e.target.value }, this.updateAccessor);

	handleClick = e => {
		const { text, exact, activeFlag } = this.state;
		const newFlag = {
			exact,
			text: text,
			flag: this.props.flags[activeFlag].key,
		};
		this.setState({ text: '' }, () => this.updateAccessor(newFlag));
	};

	handleActiveFlag = activeFlag => this.setState({ activeFlag });

	render() {
		const { placeholder, flags } = this.props;
		const { text, exact, activeFlag } = this.state;
		return (
			<div>
				<Row>
					<Checkbox onChange={this.toggleExact} checked={exact}>
						Exact phrase
					</Checkbox>
				</Row>
				<Row>
					<Col xs={12}>
						<Input value={text} onChange={this.updateInput} placeholder={placeholder} />
					</Col>
					<Col xs={12}>
						<Row type="flex">
							<Dropdown
								options={flags}
								defaultOption={firstEntry(flags)}
								input={{ onChange: this.handleActiveFlag, value: activeFlag }}
							/>
							<Button type="primary" onClick={this.handleClick}>
								ADD
							</Button>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}
