import React, { Component } from "react";
import * as R from "ramda";

import { SearchkitComponent } from "searchkit";
import { EntityFilter } from "../EntityFilter";

import { equals } from "ramda";
import sid from "shortid";

// We have to hide and open components first or else they won't register in searchkit filters
export class MentionsRender extends SearchkitComponent {
  state = { hidden: true, entities: {} };

  componentDidMount() {
    this.searchkit.search();
    setTimeout(() => {
      const entities = this.props.entities.reduce(
        (dict, entry) => ({ ...dict, [entry.key]: true }),
        {}
      );
      this.setState({ hidden: false, entities });
    }, 200);
  }

  toggleCollapse = key => collapsed => {
    this.setState(R.assocPath(["entities", key], collapsed));
  };

  isCollapsed(key) {
    const { hidden, entities } = this.state;
    return hidden === true ? false : entities[key];
  }

  render() {
    // Map key to - entity, title
    const { hidden } = this.state;
    const { entities } = this.props;
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
