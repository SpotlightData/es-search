import React, { Component } from "react";
import PropTypes from "prop-types";

import { Select as SKSelect, SortingSelector } from "searchkit";
import { Select as AntSelect } from "antd";

class Select extends SKSelect {
  onChange(value) {
    const { setItems } = this.props;
    setItems([value]);
  }

  render() {
    const { items, translate } = this.props;
    return (
      <AntSelect onChange={this.onChange} value={this.getSelectedValue()}>
        {items.map(item => {
          const { key, label, title } = item;
          const text = translate(label || title || key);
          return (
            <AntSelect.Option key={key} value={key}>
              {text}
            </AntSelect.Option>
          );
        })}
      </AntSelect>
    );
  }
}

const options = [
  {
    label: "Relevance",
    field: "_score",
    order: "desc"
  },
  {
    label: "Latest",
    field: "jsonLD.dateCreated",
    order: "desc"
  },
  {
    label: "Earliest",
    field: "jsonLD.dateCreated",
    order: "asc"
  },
  {
    label: "Largest",
    field: "jsonLD.fileSize",
    order: "desc"
  },
  {
    label: "Smallest",
    field: "jsonLD.fileSize",
    order: "asc"
  }
];

const Sorter = props => <SortingSelector {...props} />;

Sorter.defaultProps = {
  listComponent: Select,
  options
};

export default Sorter;
