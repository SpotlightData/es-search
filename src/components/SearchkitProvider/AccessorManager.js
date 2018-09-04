import { AccessorManager as SKAccessorManager } from "searchkit";
import { mergeDeepRight, map, reduce } from "ramda";

export class AccessorManager extends SKAccessorManager {
  constructor() {
    super();
    this.stateValue = {};
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
      {},
      this.getStatefulAccessors()
    );
  }
}
