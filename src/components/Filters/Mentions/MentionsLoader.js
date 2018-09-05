import React, { Component } from "react";
import { func } from "prop-types";

import { SearchkitComponent } from "searchkit";

import { EntityAccessor } from "./EntityAccessor";

export class MentionsLoader extends SearchkitComponent {
  static propTypes = {
    render: func.isRequired
  };

  static defaultProps = {};

  defineAccessor = EntityAccessor.create;

  componentDidMount() {
    this.searchkit.performSearch();
  }

  render() {
    const { render } = this.props;
    const entries = this.accessor.getEntities();
    if (entries.length === 0) {
      return null;
    }
    return render(entries);
  }
}
