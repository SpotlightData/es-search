import React from 'react';
import { string, arrayOf } from 'prop-types';

import { Row, Input, Checkbox } from 'antd';
import { SearchkitComponent } from 'searchkit';

const makeExact = str => `"${str}"`;
const identity = a => a;

export class TextSearch extends SearchkitComponent {
	static propTypes = {
		fields: arrayOf(string),
		placeholder: string,
	};

	static defaultProps = {
		fields: ['jsonLD.text'],
		placeholder: 'Search text',
	};

	state = { input: '', exact: false };

	// Should also trigger search
	toggleExact = exact => this.setState({ exact });

	updateInput = e => this.setState({ input: e.target.value });

	render() {
		const { placeholder } = this.props;
		const { input, exact } = this.state;
		return (
			<div>
				<Row>
					<Checkbox onChange={this.toggleExact} value={exact}>
						Exact
					</Checkbox>
				</Row>
				<Row>
					<Input value={input} onChange={this.updateInput} placeholder={placeholder} />
				</Row>
			</div>
		);
	}
}
