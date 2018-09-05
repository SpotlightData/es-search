import React, { Component } from "react";
import { string } from "prop-types";
import { CollapsiblePanel } from "@spotlightdata/nanowire-extensions/lib/components/antd/Collapse";

export class EntityFilter extends Component {
  static propTypes = {
    title: string.isRequired,
    entity: string.isRequired
  };

  state = { collapsed: true };

  handleCollapse = collapsed => this.setState({ collapsed });

  render() {
    const { collapsed } = this.state;
    const { title, entity } = this.props;
    return (
      <CollapsiblePanel
        header={title}
        collapsed={collapsed}
        onClick={this.handleCollapse}
      >
        Test
      </CollapsiblePanel>
    );
  }
}
