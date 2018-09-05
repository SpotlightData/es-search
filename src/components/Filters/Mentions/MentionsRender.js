import React, { Component } from "react";
import * as R from "ramda";

import { SearchkitComponent } from "searchkit";
import { EntityFilter } from "../EntityFilter";
import { EntitiesCore } from "../EntityFilter/Core";

import { equals } from "ramda";
import sid from "shortid";

const entityCount = obj => obj.entities.length;
const same = (fn, v1, v2) => fn(v1) === fn(v2);
// We have to hide and open components first or else they won't register in searchkit filters
export class MentionsRender extends SearchkitComponent {
  state = { entities: {}, items: [] };

  componentDidUpdate(prevProps) {
    if (
      !same(entityCount, this.props, prevProps) &&
      entityCount(this.props) !== 0
    ) {
      const { items, entities } = this.props.entities.reduce(
        ({ items, entities }, { key }) => {
          return {
            entities: R.assoc(key, true, entities),
            items: [key, ...items]
          };
        },
        { items: [], entities: {} }
      );
      this.createCore(this.searchkit, items);
      this.setState({ items, entities }, () => this.searchkit.search());
    }
  }

  createCore = (searchkit, items) => {
    if (!this.core) {
      this.core = EntitiesCore.create(searchkit);
      items.map(key => {
        this.core.addAccessor(key);
      });
    }
  };

  toggleCollapse = key => collapsed => {
    this.setState(R.assocPath(["entities", key], collapsed));
  };

  isCollapsed(key) {
    const { entities } = this.state;
    return entities[key];
  }

  render() {
    // Map key to - entity, title
    const { items } = this.state;
    return (
      <React.Fragment>
        {items.map(key => (
          <EntityFilter
            key={key}
            title={key}
            entity={key}
            onClick={this.toggleCollapse(key)}
            collapsed={this.isCollapsed(key)}
          />
        ))}
      </React.Fragment>
    );
  }
}
