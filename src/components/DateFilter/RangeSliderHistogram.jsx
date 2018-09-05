import React from "react";

import { RangeHistogram } from "./RangeHistogram";
import { RangeSlider } from "./RangeSlider";

export const RangeSliderHistogram = props => (
  <React.Fragment>
    <RangeHistogram {...props} />
    <RangeSlider {...props} />
  </React.Fragment>
);
