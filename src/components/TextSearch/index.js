import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';

import { Row, Col, Button, Checkbox } from 'antd';
import { SearchkitComponent } from 'searchkit';

import { Dropdown } from '@spotlightdata/nanowire-extensions/lib/components/form/Dropdown';
import { TextField } from '@spotlightdata/nanowire-extensions/lib/components/form/TextField';

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

	state = { text: '', exact: true, activeFlag: undefined, loaded: false, meta: {} };

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
		const { text, exact, meta, activeFlag } = this.state;

		// Clear previous error
		if (Object.keys(meta).length !== 0) {
			this.setState({ meta: {} });
		}

		if (flag !== undefined) {
			this.accessor.addFlag(flag);
		}
		const newSearch =
			text.length === 0
				? undefined
				: {
						exact,
						text: text,
						flag: activeFlag,
				  };

		this.accessor.setSearch(newSearch);
		this.searchkit.performSearch();
	};

	toggleExact = e => this.setState({ exact: e.target.checked });

	updateInput = e => this.setState({ text: e.target.value }, this.updateAccessor);

	handleClick = e => {
		const { text, exact, activeFlag } = this.state;

		if (text.length === 0) {
			return this.setState({
				meta: {
					error: 'Search text empty',
				},
			});
		}

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
		const { text, exact, activeFlag, meta } = this.state;
		return (
			<div>
				<Row>
					<Checkbox onChange={this.toggleExact} checked={exact}>
						Exact phrase
					</Checkbox>
				</Row>
				<Row>
					<Col xs={12}>
						<Row type="flex">
							<Dropdown
								options={flags}
								defaultOption={firstEntry(flags)}
								input={{ onChange: this.handleActiveFlag, value: activeFlag }}
							/>
							<TextField
								input={{ value: text, onChange: this.updateInput }}
								placeholder={placeholder}
								meta={meta}
							/>
						</Row>
					</Col>
					<Col xs={12}>
						<Button type="primary" onClick={this.handleClick}>
							ADD
						</Button>
					</Col>
				</Row>
			</div>
		);
	}
}
