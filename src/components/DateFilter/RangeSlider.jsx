import React from "react";

import { RangeSlider as SKRangeSlider } from "searchkit";
import { Slider } from "antd";

export class RangeSlider extends SKRangeSlider {
  render() {
    const { step, rangeFormatter, min, max, minValue, maxValue } = this.props;
    return (
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={[minValue, maxValue]}
        defaultValue={[min, max]}
        tipFormatter={rangeFormatter}
        onChange={this.onChange}
        onAfterChange={this.onFinished}
      />
    );
  }
}
