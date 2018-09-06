import React from "react";

import {
  GroupedSelectedFilters,
  FilterGroupItem as SkFilterGroupItem,
  FilterGroup as SkFilterGroup
} from "searchkit";
import { Tag } from "antd";

const map = (ls, fn) => ls.map(fn);

class FilterGroupItem extends SkFilterGroupItem {
  render() {
    const { label } = this.props;
    return (
      <Tag closable onClose={this.removeFilter}>
        {label}
      </Tag>
    );
  }
}

class FilterGroup extends SkFilterGroup {
  renderFilter(filter) {
    const { translate, removeFilter } = this.props;
    // console.log(filter);
    return (
      <FilterGroupItem
        key={filter.value}
        itemKey={filter.value}
        filter={filter}
        label={translate(filter.value)}
        removeFilter={removeFilter}
      />
    );
  }

  render() {
    const { title, filters } = this.props;
    return (
      <div key={title}>{map(filters, filter => this.renderFilter(filter))}</div>
    );
  }
}

const ActiveFiltersDisplay = props => (
  <GroupedSelectedFilters groupComponent={FilterGroup} {...props} />
);

export default ActiveFiltersDisplay;
