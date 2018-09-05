import React, { PureComponent } from "react";
import { string, number, arrayOf } from "prop-types";

import { Row } from "antd";

import { RangeFilter } from "searchkit";
import { defaultTimeFormat } from "@spotlightdata/nanowire-extensions/lib/helpers/time";
import { DatePicker } from "@spotlightdata/nanowire-extensions/lib/components/antd/DatePicker";

import { RangeSliderHistogram } from "./RangeSliderHistogram";

// Use this to avoid some unneded props overriding event handlers
const dateRender = ({ minValue, maxValue, onFinished }) => (
  <DatePicker minValue={minValue} maxValue={maxValue} onFinished={onFinished} />
);

export default class DateFilter extends PureComponent {
  static propTypes = {
    field: string,
    rangeStart: number,
    ids: arrayOf(string)
  };

  static defaultProps = {
    field: "jsonLD.dateCreated",
    rangeStart: Date.parse("2010-01-01"),
    ids: ["date1", "date2"]
  };

  render() {
    const { field, ids, rangeStart } = this.props;
    return (
      <React.Fragment>
        <Row>
          <RangeFilter
            title="Date Created"
            field={field}
            id={ids[0]}
            min={rangeStart}
            max={Date.now()}
            showHistogram
            rangeFormatter={defaultTimeFormat}
            rangeComponent={RangeSliderHistogram}
          />
        </Row>
        <Row>
          <RangeFilter
            title=""
            field={field}
            id={ids[0]}
            min={Date.now() - 1}
            max={Date.now()}
            rangeComponent={dateRender}
          />
        </Row>
      </React.Fragment>
    );
  }
}
