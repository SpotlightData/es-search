import React from "react";
import { number } from "prop-types";

import { SearchkitComponent, PaginationAccessor } from "searchkit";
import { Pagination as AntPagination } from "antd";

import { pathOr } from "ramda";

export default class Pagination extends SearchkitComponent {
  static propTypes = {
    pageSize: number
  };

  static defaultProps = {
    pageSize: 15
  };

  updatePage = page => {
    this.accessor.state = this.accessor.state.setValue(page);
    this.searchkit.performSearch();
  };

  defineAccessor() {
    return new PaginationAccessor("page");
  }

  getCurrentPage() {
    return Number(this.accessor.state.getValue()) || 1;
  }

  render() {
    const { pageSize } = this.props;
    return (
      <AntPagination
        current={this.getCurrentPage()}
        total={pathOr(1, ["searchkit", "results", "hits", "total"], this)}
        pageSize={pageSize}
        onChange={this.updatePage}
      />
    );
  }
}
