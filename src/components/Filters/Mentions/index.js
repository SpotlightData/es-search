import React, { Component } from "react";
import * as R from "ramda";

import { SearchkitComponent } from "searchkit";
import { EntityFilter } from "../EntityFilter";
import { EntityAccessor } from "./EntityAccessor";

import { equals } from "ramda";
import sid from "shortid";

// We have to hide and open components first or else they won't register in searchkit filters
export class Mentions extends SearchkitComponent {
  state = { hidden: true, entities: {} };

  defineAccessor = EntityAccessor.create;

  componentDidMount() {
    this.searchkit.search();
    setTimeout(() => {
      // const entities = this.props.entities.reduce(
      //   (dict, entry) => ({ ...dict, [entry.key]: true }),
      //   {}
      // );
      // this.setState({ hidden: false, entities });
      this.setState({ hidden: false });
    }, 200);
  }

  toggleCollapse = key => collapsed => {
    this.setState(R.assocPath(["entities", key], collapsed));
  };

  isCollapsed(key) {
    const { hidden, entities } = this.state;
    return hidden === true
      ? false
      : entities[key] === undefined
        ? true
        : entities[key];
  }

  render() {
    // Map key to - entity, title
    const { hidden } = this.state;
    const entities = this.accessor.getEntities();
    const style = hidden ? { visibility: "hidden" } : {};
    return (
      <React.Fragment>
        <div style={style}>
          {entities.map(({ key }) => (
            <EntityFilter
              key={key}
              title={key}
              entity={key}
              onClick={this.toggleCollapse(key)}
              collapsed={this.isCollapsed(key)}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
