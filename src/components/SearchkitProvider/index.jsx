import React, { Component } from "react";
import { node, string, shape, func } from "prop-types";

import { SearchkitProvider as SKProvider } from "searchkit";
import { Loading } from "@spotlightdata/nanowire-extensions/lib/components/ui/Loading";
import { SearchkitManager } from "./SearchkitManager";

export default class SearchkitProvider extends Component {
  static propTypes = {
    children: node.isRequired,
    projectId: string.isRequired,
    token: string.isRequired,
    history: shape({}).isRequired,
    loadingComponent: func,
    queryKey: string,
    myTab: string
  };

  static defaultProps = {
    loadingComponent: Loading,
    queryKey: "sk",
    myTab: "2"
  };

  state = {
    searchkit: undefined
  };

  componentDidMount() {
    const { projectId, token, history, queryKey, myTab } = this.props;
    if (this.state.searchkit === undefined) {
      this.setState({
        searchkit: SearchkitManager.create({
          url: "/api/searches/searchkit",
          projectId,
          token,
          history,
          queryKey,
          myTab
        })
      });
    }
  }

  render() {
    const { searchkit } = this.state;
    const { loadingComponent: LoadingComp } = this.props;

    if (searchkit === undefined) {
      return <LoadingComp />;
    }

    return (
      <SKProvider searchkit={searchkit}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </SKProvider>
    );
  }
}
