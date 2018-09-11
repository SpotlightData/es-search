import React from "react";
import PropTypes from "prop-types";

import { Button } from "antd";
import { SearchkitComponent } from "searchkit";

export default class ExposeQuery extends SearchkitComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.searchkit.query.getJSON());
  };

  render() {
    const { onSubmit, ...rest } = this.props;
    return (
      <Button type="primary" onClick={this.handleSubmit} {...rest}>
        Create result analysis
      </Button>
    );
  }
}
ExposeQuery.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
