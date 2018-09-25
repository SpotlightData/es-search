import React from 'react';
import { string, number, arrayOf, shape, func } from 'prop-types';

import { Row, Col, Button, Checkbox } from 'antd';
import { SearchkitComponent } from 'searchkit';

import { Dropdown } from '@spotlightdata/nanowire-extensions/lib/components/form/Dropdown';
import { TextField } from '@spotlightdata/nanowire-extensions/lib/components/form/TextField';

import throttle from 'lodash.throttle';
import injectSheets from 'react-jss';

import { TextSearchAccessor } from './TextSearchAccessor';
import style from './style';

const firstEntry = obj => Object.values(obj)[0];

const ENTER_KEY = 13;

class TextSearchBare extends SearchkitComponent {
	static propTypes = {
		fields: arrayOf(string),
		placeholder: string,
		flags: shape({}),
		title: string,
		throttle: number,
		className: string,
		classes: shape({
			topRow: string.isRequired,
			padded: string.isRequired,
		}).isRequired,
		customRender: func,
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
		title: 'text_search',
		throttle: 600,
		className: '',
		customRender: undefined,
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
		return new TextSearchAccessor(this.props.title, this.props.fields, this.props.flags);
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
		const { placeholder, flags, classes, className, customRender } = this.props;
		const { text, exact, activeFlag, meta } = this.state;

		const checkbox = (
			<Checkbox onChange={this.toggleExact} checked={exact}>
				Exact phrase
			</Checkbox>
		);
		const dropdown = (
			<Dropdown
				options={flags}
				defaultOption={firstEntry(flags)}
				input={{ onChange: this.handleActiveFlag, value: activeFlag }}
			/>
		);

		const textField = (
			<TextField
				input={{ value: text, onChange: this.updateInput }}
				placeholder={placeholder}
				meta={meta}
			/>
		);

		const button = (
			<Button type="primary" onClick={this.handleClick}>
				ADD
			</Button>
		);

		if (customRender) {
			return customRender({ checkbox, dropdown, textField, button });
		}

		return (
			<div className={className}>
				<Row className={classes.topRow}>{checkbox} </Row>
				<Row>
					<Col xs={24} md={20}>
						<Row>
							<Col xs={4} md={6}>
								{dropdown}
							</Col>
							<Col xs={20} md={18}>
								{textField}
							</Col>
						</Row>
					</Col>
					<Col xs={24} md={4}>
						<div style={{ float: 'right' }}>{button}</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export const TextSearch = injectSheets(style)(TextSearchBare);
