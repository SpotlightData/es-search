import React, { Component } from "react";
import { shape, string } from "prop-types";

import { Checkbox, Row, Col } from "antd";
import { Badge } from "@spotlightdata/nanowire-extensions/lib/components/antd/Badge";
import { RefinementListFilter, FastClick } from "searchkit";
import { RefinementAccessor } from "./Accessor";

import sid from "shortid";

const style = { color: "#108ee9", cursor: "pointer" };
const badgeStyle = { backgroundColor: "#1890ff" };
/*
  Required props
  entity = the @type of the entity we want to filter by
*/
export class EntityRefinementListFilter extends Component {
  static propTypes = {
    core: shape({}).isRequired,
    title: string.isRequired,
    entity: string.isRequired
  };

  toggleFilter = key => _changed => {
    this.props.core.cycle(this.props.entity, key);
  };

  getAccessor() {
    return this.props.core.get(this.props.entity);
  }

  getSelectedItems() {
    return this.getAccessor().state.getValue();
  }

  getItems() {
    return this.getAccessor().getBuckets();
  }

  toggleViewMoreOption(option) {
    this.props.core.setViewMoreOption(this.props.entity, option);
  }

  isSelected(key) {
    return this.getSelectedItems()[key] === "1";
  }

  renderShowMore() {
    const accessor = this.getAccessor();
    const optionMore = accessor.getMoreSizeOption();
    const optionLess = accessor.getLessSizeOption();
    if (!optionMore && !optionLess) {
      return null;
    }

    return (
      <div key="showMoreLess">
        {optionMore && (
          <FastClick handler={() => this.toggleViewMoreOption(optionMore)}>
            <div style={style}>More</div>
          </FastClick>
        )}
        {optionLess && (
          <FastClick handler={() => this.toggleViewMoreOption(optionLess)}>
            <div style={style}>Less</div>
          </FastClick>
        )}
      </div>
    );
  }

  render() {
    const showMore = this.renderShowMore();
    const rows = this.getItems();
    return (
      <React.Fragment>
        {rows.map(({ key, doc_count }) => (
          <Row key={sid.generate()} type="flex" justify="space-between">
            <Checkbox
              onChange={this.toggleFilter(key)}
              checked={this.isSelected(key)}
            >
              {key}
            </Checkbox>
            <Badge count={doc_count} style={badgeStyle} />
          </Row>
        ))}
        <Row>{showMore}</Row>
      </React.Fragment>
    );
  }
}
