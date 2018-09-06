import React, { Component } from "react";
import { node, string, number, shape, func } from "prop-types";

import { SearchkitProvider as SKProvider } from "searchkit";
import { Loading } from "@spotlightdata/nanowire-extensions/lib/components/ui/Loading";
import { SearchkitManager } from "./SearchkitManager";
import { identity } from "../../helpers";

export default class SearchkitProvider extends Component {
  static propTypes = {
    children: node.isRequired,
    projectId: string.isRequired,
    token: string.isRequired,
    history: shape({}).isRequired,
    loadingComponent: func,
    queryKey: string,
    myTab: string,
    url: string,
    customise: func,
    loadWait: number
  };

  static defaultProps = {
    loadingComponent: Loading,
    customise: identity,
    queryKey: "sk",
    url: "/api/searches/searchkit",
    myTab: "2",
    loadWait: 2000
  };

  state = {
    searchkit: undefined
  };

  resetTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(
      this.state.searchkit.stopLoad,
      this.props.loadWait
    );
  };

  componentDidMount() {
    const {
      projectId,
      token,
      history,
      queryKey,
      myTab,
      customise,
      url
    } = this.props;
    if (this.state.searchkit === undefined) {
      const config = {
        url,
        projectId,
        token,
        history,
        queryKey,
        myTab
      };
      this.setState(
        {
          searchkit: SearchkitManager.create(config, customise)
        },
        this.resetTimeout
      );
    }
  }

  componentDidUpdate() {
    this.resetTimeout();
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
