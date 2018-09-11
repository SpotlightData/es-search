import React, { Component } from "react";
import {
  string,
  number,
  bool,
  arrayOf,
  shape,
  oneOfType,
  func
} from "prop-types";

import { Row } from "antd";
import {
  SearchkitComponent,
  SourceFilterAccessor,
  PageSizeAccessor
} from "searchkit";
import { Table } from "@spotlightdata/nanowire-extensions/lib/components/antd/Table";
import { bytesToReadable } from "@spotlightdata/nanowire-extensions/lib/helpers/table";
import Pagination from "../Pagination";

import * as R from "ramda";

const inLd = name => "jsonLD." + name;

export default class HitsTable extends SearchkitComponent {
  static propTypes = {
    hitsPerPage: number,
    sourceFilter: oneOfType([string, arrayOf(string), bool]),
    columns: arrayOf(shape({})).isRequired,
    formatRow: func,
    filter: func
  };
  static defaultProps = {
    hitsPerPage: 10,
    sourceFilter: ["name", "dateCreated", "dateModified", "fileSize"].map(inLd),
    formatRow: undefined,
    filter: undefined
  };

  componentDidMount() {
    // Without timeout first search will ignore the hitsPerPage setting
    setTimeout(() => {
      this.searchkit.addAccessor(
        new SourceFilterAccessor(this.props.sourceFilter)
      );
      this.searchkit
        .getAccessorByType(PageSizeAccessor)
        .setSize(this.props.hitsPerPage);
      this.searchkit.performSearch();
    }, 0);
  }

  format(task) {
    const data = R.pathOr({}, ["_source", "jsonLD"], task);
    return {
      _id: task._id,
      name: data.name,
      dateCreated: data.dateCreated,
      dateModified: data.dateModified,
      fileSize: bytesToReadable(data.fileSize)
    };
  }

  render() {
    const { hitsPerPage, columns, format, filter } = this.props;
    const formatter = format || this.format;
    console.log(this.getHits());
    let results = this.getHits().reduce(
      (list, item) => list.concat([formatter(item)]),
      []
    );
    if (filter) {
      results = results.filter(filter);
    }
    return (
      <React.Fragment>
        <Table
          dataSource={results}
          columns={columns}
          pagination={false}
          loading={this.isLoading()}
        />
        <Row type="flex" justify="end" style={{ marginTop: "1em" }}>
          <Pagination pageSize={hitsPerPage} />
        </Row>
      </React.Fragment>
    );
  }
}
