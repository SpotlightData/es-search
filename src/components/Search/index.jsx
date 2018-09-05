import React from "react";
import { string, bool, number, func } from "prop-types";
import { Input } from "antd";
import {
  SearchBox as SKSearchBox,
  InputFilter as SKInputFilter
} from "searchkit";

import { RelaxedSearch } from "./RelaxedSearch";

const propTypes = {
  placeholder: string,
  autofocus: bool,
  searchOnChange: bool,
  searchThrottleTime: number,
  queryBuilder: func,
  id: string
};

const defaultProps = {
  searchOnChange: true,
  searchThrottleTime: 500,
  queryBuilder: RelaxedSearch,
  id: "search"
};

const render = self => {
  return (
    <Input.Search
      placeholder={self.props.placeholder}
      onChange={e => self.onChange(e)}
      onFocus={() => self.setFocusState(true)}
      onBlur={() => self.setFocusState(false)}
      value={self.getValue()}
    />
  );
};

export class Search extends SKSearchBox {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return render(this);
  }
}

export class SearchFilter extends SKInputFilter {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return render(this);
  }
}
