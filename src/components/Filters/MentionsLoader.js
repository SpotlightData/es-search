import React, { Component } from "react";
import { func } from "prop-types";

import { Loading } from "@spotlightdata/nanowire-extensions/lib/components/ui/Loading";
import { SearchkitComponent } from "searchkit";

import { EntityAccessor } from "./shared/EntityAccessor";

export class MentionsLoader extends SearchkitComponent {
  static propTypes = {
    loadingComponent: func,
    render: func.isRequired
  };

  static defaultProps = {
    loadingComponent: Loading
  };

  defineAccessor = EntityAccessor.create;

  componentDidMount() {
    this.searchkit.performSearch();
  }

  render() {
    const { loadingComponent: LoadingComp, render } = this.props;
    if (this.isLoading()) {
      return <LoadingComp />;
    }
    return render(this.accessor.getEntities());
  }
}
