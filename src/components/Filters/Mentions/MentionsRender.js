import React, { Component } from "react";
import * as R from "ramda";

// import { SearchkitComponent } from "searchkit";
import { EntityFilter } from "../EntityFilter";
import { EntitiesCore } from "../EntityFilter/Core";

import { equals } from "ramda";
import sid from "shortid";

export class MentionsRender extends Component {
  state = { entities: {}, items: [], entityList: [] };

  // To prevent dropdown from getting closed, as we get passed different entity props over time
  static getDerivedStateFromProps(props, state) {
    const { entityList } = state;
    return {
      entityList: entityList.length === 0 ? props.entities : entityList
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const sameState = equals(this.state, nextState);
    return !sameState;
  }

  componentDidUpdate(prevProps) {
    const { items, entityList } = this.state;
    if (items.length !== entityList.length) {
      const { items, entities } = entityList.reduce(
        ({ items, entities }, { key }) => {
          return {
            entities: R.assoc(key, true, entities),
            items: [key, ...items]
          };
        },
        { items: [], entities: {} }
      );
      this.createCore(this.getSearchkit(), items);
      this.setState({ items, entities }, () => {
        this.getSearchkit().performSearch();
      });
    }
  }

  componentWillUnmount() {
    if (this.core) {
      this.core.removeAccessors();
    }
  }

  getSearchkit() {
    return this.props.searchkit;
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
            core={this.core}
          />
        ))}
      </React.Fragment>
    );
  }
}
