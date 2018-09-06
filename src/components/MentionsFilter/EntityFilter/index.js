import React, { Component } from "react";
import { bool, string, func, shape } from "prop-types";

import { Row } from "antd";
import { SearchkitComponent } from "searchkit";

import { CollapsiblePanel } from "@spotlightdata/nanowire-extensions/lib/components/antd/Collapse";
import { EntityQuery } from "./EntityQuery";
import { EntityRefinementListFilter } from "./RefinementList";
import { SearchFilter } from "../../Search";

export class EntityFilter extends SearchkitComponent {
  static propTypes = {
    title: string.isRequired,
    entity: string.isRequired,
    onClick: func.isRequired,
    collapsed: bool.isRequired,
    core: shape({}).isRequired
  };

  render() {
    const { title, entity, collapsed, onClick, core } = this.props;
    return (
      <CollapsiblePanel header={title} collapsed={collapsed} onClick={onClick}>
        <Row style={{ marginBottom: "1em" }}>
          <SearchFilter
            id={`${entity}_typed`}
            title=""
            placeholder="Search here"
            searchOnChange
            queryFields={["jsonLD.mentions.name"]}
            queryBuilder={EntityQuery(entity)}
          />
        </Row>
        <Row>
          <EntityRefinementListFilter
            entity={entity}
            title={title}
            core={core}
          />
        </Row>
      </CollapsiblePanel>
    );
  }
}
