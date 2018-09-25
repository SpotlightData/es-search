import React from 'react';

import {
  GroupedSelectedFilters,
  FilterGroupItem as SkFilterGroupItem,
  FilterGroup as SkFilterGroup,
} from 'searchkit';
import { Tag } from 'antd';

const map = (ls, fn) => ls.map(fn);

class FilterGroupItem extends SkFilterGroupItem {
  render() {
    const { label, prefix } = this.props;
    const showSeperator = prefix && typeof prefix === 'string' && prefix.length !== 0;
    return (
      <Tag closable onClose={this.removeFilter} color="#108ee9">
        {prefix} {showSeperator ? '|' : null} {label}
      </Tag>
    );
  }
}

class FilterGroup extends SkFilterGroup {
  renderFilter(filter) {
    const { translate, removeFilter } = this.props;
    return (
      <FilterGroupItem
        key={filter.value}
        itemKey={filter.value}
        filter={filter}
        label={translate(filter.value)}
        prefix={filter.name}
        removeFilter={removeFilter}
      />
    );
  }

  render() {
    const { title, filters } = this.props;
    return <div key={title}>{map(filters, filter => this.renderFilter(filter))}</div>;
  }
}

const ActiveFiltersDisplay = props => (
  <GroupedSelectedFilters groupComponent={FilterGroup} {...props} />
);

export default ActiveFiltersDisplay;
