import { RefinementAccessor } from "./RefinementList/Accessor";

const defaults = {
  size: 5,
  field: "jsonLD.mentions.name.keyword",
  operator: "AND",
  fieldOptions: {
    type: "nested",
    options: {
      path: "jsonLD.mentions"
    }
  },
  collapsable: true,
  showMore: true
};

export class EntitiesCore {
  static create(searchkit) {
    return new EntitiesCore(searchkit);
  }

  constructor(searchkit) {
    this.searchkit = searchkit;
    this.accessors = {};
  }

  getAccessorOptions(config) {
    const {
      field,
      operator,
      title,
      include,
      exclude,
      size,
      translations,
      orderKey,
      orderDirection,
      fieldOptions
    } = Object.assign({}, defaults, config);
    return {
      operator,
      title,
      size,
      include,
      exclude,
      field,
      translations,
      orderKey,
      orderDirection,
      fieldOptions
    };
  }

  addAccessor(entity, config = {}) {
    this.accessors[entity] = this.defineAccessor(entity, config);
  }

  defineAccessor(entity, config) {
    const { field, ...rest } = this.getAccessorOptions(config);
    const accessorOptions = Object.assign(rest, {
      entity,
      field,
      filterName: `${entity}Filter`,
      actualField: field,
      id: `${entity}_checked`
    });
    return new RefinementAccessor(field + entity, accessorOptions);
  }

  removeAccessors() {
    Object.values(this.accessors).map(accessor => {
      this.searchkit.removeAccessor(accessor);
    });
  }

  get(key) {
    return this.accessors[key];
  }
}
