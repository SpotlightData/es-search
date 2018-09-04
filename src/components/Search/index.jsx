import React from "react";
import { string, bool, number, func } from "prop-types";
import { Input } from "antd";
import { SearchBox as SKSearchBox } from "searchkit";

import { RelaxedSearch } from "./RelaxedSearch";

export default class Search extends SKSearchBox {
  static propTypes = {
    placeholder: string,
    autofocus: bool,
    searchOnChange: bool,
    searchThrottleTime: number,
    queryBuilder: func,
    id: string
  };

  static defaultProps = {
    searchOnChange: true,
    searchThrottleTime: 500,
    queryBuilder: RelaxedSearch,
    id: "search"
  };

  render() {
    const value = this.getValue();
    return (
      <Input.Search
        placeholder={this.props.placeholder}
        onChange={e => this.onChange(e)}
        onFocus={() => this.setFocusState(true)}
        onBlur={() => this.setFocusState(false)}
        value={value}
      />
    );
  }
}
