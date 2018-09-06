import { State } from "searchkit";

export const stateEnum = {
  ON: "1",
  NOT: "2"
};

export class MapState extends State {
  getValue() {
    return this.value || {};
  }
  clear() {
    return this.create({});
  }

  add(key, value) {
    const oldState = this.getValue();
    oldState[key] = value;
    return this.create(oldState);
  }

  remove(key) {
    const oldState = this.getValue();
    delete oldState[key];
    return this.create(oldState);
  }

  contains(key) {
    return !!this.getValue()[key];
  }

  getFilterValue(key) {
    if (this.contains(key)) {
      return this.getValue()[key];
    }
    return false;
  }

  isValue(key, value) {
    if (this.contains(key)) {
      return this.getValue()[key] === value;
    }
    return false;
  }

  cycle(key) {
    const oldVal = this.getValue()[key];
    switch (oldVal) {
      case stateEnum.ON:
        return this.remove(key);
      case stateEnum.NOT:
        return this.add(key, stateEnum.ON);
      default:
        return this.add(key, stateEnum.ON);
    }
  }
}
