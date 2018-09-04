import { SearchkitManager as SkManager } from "searchkit";
import * as R from "ramda";

import {
  queryUrlToObject,
  queryObjectToString
} from "@spotlightdata/nanowire-extensions/lib/helpers/request";
import { AccessorManager } from "./AccessorManager";
import { identity } from "../../helpers";
import { stateFromQuery, updateSKHistory } from "./utils";

export class SearchkitManager extends SkManager {
  static create(options, customise = identity) {
    const { url, projectId, token, history, queryKey, myTab } = options;
    return new SearchkitManager(
      queryKey,
      url,
      customise({
        myTab,
        httpHeaders: {
          "X-Level": "PROJECT",
          "X-Resource-Id": projectId,
          Authorization: `JWT ${token}`
        },
        timeout: 20000,
        searchOnLoad: true,
        useHistory: true,
        createHistory: () => history,
        getLocation: () => history.location
      })
    );
  }

  constructor(queryKey, ...opts) {
    super(...opts);
    this.queryKey = queryKey;
    this.accessors = AccessorManager.from(this.accessors);
  }

  performSearch(replaceState = false, notifyState = true) {
    const { history } = this;
    if (notifyState && equals(this.accessors.getState(), this.state)) {
      this.accessors.notifyStateChange(this.state);
    }
    const searchPromise = this._search();
    if (this.options.useHistory) {
      const historyMethod = replaceState ? history.replace : history.push;
      const newHistoryState = updateSKHistory(
        history,
        this.queryKey,
        this.state
      );
      historyMethod.call(history, newHistoryState);
    }
    return searchPromise;
  }

  searchFromUrlQuery(queryString) {
    const newState = stateFromQuery(this.queryKey)(queryString);
    this.accessors.setState(newState);
    return this._search();
  }

  runInitialSearch() {
    if (this.options.searchOnLoad) {
      this._searchWhenCompleted(this.options.getLocation());
    }
  }

  listenToHistory() {
    let prevTab;
    this._unlistenHistory = this.history.listen((location, action) => {
      const tab = queryUrlToObject(location.search)["tab"];
      if (action === "POP") {
        this._searchWhenCompleted(location);
      } else if (prevTab !== tab && tab === this.options.myTab) {
        this._searchWhenCompleted(location);
      }
      prevTab = tab;
    });
  }
}
