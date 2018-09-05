import React from "react";

import injectSheet from "react-jss";
import classnames from "classnames";
import sid from "shortid";

import style from "./style";

const maxBy = field => list =>
  list.reduce((val, entry) => (entry[field] > val ? entry[field] : val), 0);

const RangeHistogramBare = props => {
  const { minValue, maxValue, items = [], classes } = props;
  const maxCount = maxBy("doc_count")(items);

  if (maxCount === 0) {
    return null;
  }

  const bars = items.map(item => {
    const { key, doc_count } = item;
    // out of bounds of the sliders are styled differently
    const outOfBounds = key < minValue || key > maxValue;
    const className = classnames(
      classes.bar,
      outOfBounds ? "out-of-bounds" : null
    );

    return (
      <div
        key={sid.generate()}
        style={{
          height: `${(doc_count / maxCount) * 100}%`
        }}
        className={className}
      />
    );
  });

  return <div className={classes.container}>{bars}</div>;
};

export const RangeHistogram = injectSheet(style)(RangeHistogramBare);
