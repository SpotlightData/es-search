import React, { PureComponent } from "react";
import { string } from "prop-types";

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
    field: string
  };

  static defaultProps = {
    field: "jsonLD.dateCreated"
  };

  render() {
    const { field } = this.props;
    return (
      <React.Fragment>
        <Row>
          <RangeFilter
            field={field}
            id="date1"
            min={Date.parse("2010-01-01")}
            max={Date.now()}
            showHistogram
            title="Date Created"
            rangeFormatter={defaultTimeFormat}
            rangeComponent={RangeSliderHistogram}
          />
        </Row>
        <Row>
          <RangeFilter
            field={field}
            id="date2"
            title=""
            min={Date.now() - 1}
            max={Date.now()}
            rangeComponent={dateRender}
          />
        </Row>
      </React.Fragment>
    );
  }
}
