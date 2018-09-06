import React, { Component } from "react";
import { func } from "prop-types";

import { SearchkitComponent } from "searchkit";
import { EntityAccessor } from "./EntityAccessor";
import { MentionsRender } from "./MentionsRender";

export class Mentions extends SearchkitComponent {
  defineAccessor = EntityAccessor.create;

  componentDidMount() {
    this.searchkit.performSearch();
  }

  render() {
    return (
      <MentionsRender
        entities={this.accessor.getEntities()}
        searchkit={this.searchkit}
      />
    );
  }
}
