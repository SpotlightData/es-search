import React from "react";

import { Checkbox, Row, Col } from "antd";
import { Badge } from "@spotlightdata/nanowire-extensions/lib/components/antd/Badge";
import { RefinementListFilter, FastClick } from "searchkit";
import { RefinementAccessor } from "./Accessor";

const style = { color: "#108ee9", cursor: "pointer" };

/*
  Required props
  entity = the @type of the entity we want to filter by
*/
export class EntityRefinementListFilter extends RefinementListFilter {
  static defaultProps = {
    size: 5,
    field: "jsonLD.mentions.name.keyword",
    operator: "AND",
    fieldOptions: {
      type: "nested",
      options: {
        path: "jsonLD.mentions"
      }
    },
    collapsable: true,
    bucketsTransform: a => a,
    showMore: true
  };

  toggleFilter(key) {
    this.accessor.state = this.accessor.state.cycle(key);
    this.searchkit.performSearch();
  }

  defineAccessor() {
    const accessorOptions = this.getAccessorOptions();
    accessorOptions.entity = this.props.entity;
    accessorOptions.filterName = `${this.props.entity}Filter`;
    accessorOptions.actualField = this.props.field;
    return new RefinementAccessor(
      this.props.field + this.props.entity,
      accessorOptions
    );
  }

  renderShowMore() {
    const optionMore = this.accessor.getMoreSizeOption();
    const optionLess = this.accessor.getLessSizeOption();

    if (!optionMore && !optionLess) {
      return null;
    }

    return (
      <div key="showMoreLess">
        {optionMore && (
          <FastClick
            handler={() => this.toggleViewMoreOption(optionMore)}
            key="showMore"
          >
            <div style={style}>{this.translate(optionMore.label)}</div>
          </FastClick>
        )}
        {optionLess && (
          <FastClick
            handler={() => this.toggleViewMoreOption(optionLess)}
            key="showLess"
          >
            <div style={style}>{this.translate(optionLess.label)}</div>
          </FastClick>
        )}
      </div>
    );
  }

  render() {
    const { showCount, countFormatter } = this.props;
    const showMore = this.renderShowMore();
    const rows = this.getItems();
    console.log(rows);
    return null;
    return (
      <React.Fragment>
        {rows.map(entity => (
          <Row key={sid.generate()} type="flex" justify="space-between">
            <Checkbox
              onChange={this.toggleActive(entity.value, entity)}
              checked={entity.value in show.active}
            >
              {entity.value}
            </Checkbox>
            <Badge count={entity.position.length} style={badgeStyle} />
          </Row>
        ))}
        {/* <CheckboxList

            key="listComponent"
            items={this.getItems()}
            itemComponent={this.props.itemComponent}
            selectedItems={this.getSelectedItems()}
            toggleItem={e => this.toggleFilter(e)}
            setItems={e => this.setFilters(e)}
            docCount={this.accessor.getDocCount()}
            showCount={showCount}
            translate={this.translate}
            countFormatter={countFormatter}
          /> */}
        <Row>{showMore}</Row>
      </React.Fragment>
    );
  }
}
