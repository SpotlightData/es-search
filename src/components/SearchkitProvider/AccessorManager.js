import { AccessorManager as SKAccessorManager } from "searchkit";
import { mergeDeepRight, map, reduce } from "ramda";

export class AccessorManager extends SKAccessorManager {
  constructor() {
    super();
    this.stateValue = {};
    // Use this so initial query parameters don't get cleared away
    this.initialised = false;
    this.count = 0;
  }

  static from(initial) {
    const manager = new AccessorManager();
    manager.accessors = initial.accessors;
    manager.queryAccessor = initial.queryAccessor;
    manager.statefulAccessors = initial.statefulAccessors;
    return manager;
  }

  setState(newState) {
    this.stateValue = mergeDeepRight(this.stateValue, newState);
    map(
      accessor => accessor.fromQueryObject(this.stateValue),
      this.getStatefulAccessors()
    );
  }

  getState() {
    return reduce(
      (state, accessor) => mergeDeepRight(state, accessor.getQueryObject()),
      this.initialised ? {} : this.stateValue,
      this.getStatefulAccessors()
    );
  }
}
