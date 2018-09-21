import React, { Component } from 'react';

import { CollapsiblePanel } from '@spotlightdata/nanowire-extensions/lib/components/antd/Collapse';
import { DateFilter } from './DateFilter';

export class DateFilterCollapse extends Component {
  state = { collapsed: true };

  onChange = collapsed => this.setState({ collapsed });

  render() {
    return (
      <CollapsiblePanel
        header="Timeline"
        onClick={this.onChange}
        collapsed={this.state.collapsed}
        duration={0}
      >
        <DateFilter />
      </CollapsiblePanel>
    );
  }
}
