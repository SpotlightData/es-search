import React from "react";
import PropTypes from "prop-types";

import { ResetFilters } from "searchkit";
import { Button } from "antd";

const Display = props => {
  const { resetFilters, hasFilters } = props;

  return (
    <Button onClick={resetFilters} disabled={!hasFilters}>
      CLEAR ALL
    </Button>
  );
};

Display.propTypes = {
  hasFilters: PropTypes.bool.isRequired,
  resetFilters: PropTypes.func.isRequired
};

const ClearFiltersDisplay = props => (
  <ResetFilters component={Display} {...props} />
);

export default ClearFiltersDisplay;
