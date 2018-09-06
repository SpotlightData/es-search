import {
  FacetAccessor,
  FilterBucket,
  TermsBucket,
  CardinalityMetric,
  TermQuery,
  BoolMust,
  BoolMustNot
} from "searchkit";
import { MapState, stateEnum } from "./State";

const map = (ls, fn) => ls.map(fn);
const each = map;
const isUndefined = n => typeof n === undefined || typeof n === null;
const omitBy = (obj, filter) =>
  Object.entries(obj).reduce((dict, [key, value]) => {
    if (filter(value)) {
      return dict;
    }
    return { ...dict, [key]: value };
  }, {});

// Here we override some of the class functions so we can apply our filters and
// have multiple filters for the same field
export class RefinementAccessor extends FacetAccessor {
  constructor(key, options) {
    super(key, options);
    this.state = new MapState();
  }

  getRawBuckets() {
    return this.getAggregations(
      [
        this.uuid,
        this.fieldContext.getAggregationPath(),
        "entityFilter",
        this.key,
        "buckets"
      ],
      []
    );
  }

  getBuckets() {
    // create an map of {item.key: item} for the raw buckets
    const rawBuckets = this.getRawBuckets();
    const keyIndex = {};
    each(rawBuckets, item => {
      const key = String(item.key);
      const newItem = Object.assign({}, item, { key });
      keyIndex[key] = newItem;
    });

    const missingFilters = [];
    each(Object.keys(this.state.getValue()), filterKey => {
      if (keyIndex[filterKey]) {
        // if filter exists in the raw buckets, mark it selected
        keyIndex[filterKey].selected = true;
      } else {
        missingFilters.push({ key: filterKey, missing: true, selected: true });
      }
    });
    const buckets =
      missingFilters.length > 0
        ? missingFilters.concat(rawBuckets)
        : rawBuckets;

    return buckets;
  }

  getDocCount() {
    return this.getAggregations(
      [
        this.uuid,
        this.fieldContext.getAggregationPath(),
        "entityFilter",
        "doc_count"
      ],
      0
    );
  }

  getCount() {
    return this.getAggregations(
      [
        this.uuid,
        this.fieldContext.getAggregationPath(),
        "entityFilter",
        `${this.key}_count`,
        "value"
      ],
      0
    );
  }

  fromQueryObject(state) {
    const data = state[this.urlKey];
    if (data !== undefined) {
      this.state = this.state.create(data);
    }
  }

  //     getMoreSizeOption():ISizeOption {
  //   var option = {size:0, label:""}
  //   var total = this.getCount()
  //   var facetsPerPage = this.options.facetsPerPage
  //   if (total <= this.defaultSize) return null;

  //   if (total <= this.size) {
  //     option = {size:this.defaultSize, label:this.translate("facets.view_less")}
  //   } else if ((this.size + facetsPerPage) >= total) {
  //     option = {size:total, label:this.translate("facets.view_all")}
  //   } else if ((this.size + facetsPerPage) < total) {
  //     option = {size:this.size + facetsPerPage, label:this.translate("facets.view_more")}
  //   } else if (total ){
  //     option = null
  //   }

  //   return option;
  // }

  getLessSizeOption() {
    let option = { size: 0, label: "" };
    const total = this.getCount();
    const { facetsPerPage } = this.options;

    if (this.size - facetsPerPage >= this.defaultSize) {
      return {
        size: this.size - facetsPerPage,
        label: this.translate("facets.view_less")
      };
    } else if (total) {
      return null;
    }
    return option;
  }

  buildOwnQuery(query) {
    if (!this.loadAggregations) {
      return query;
    }
    const excludedKey = this.isOrOperator() ? this.uuid : undefined;
    return query.setAggs(
      FilterBucket(
        this.uuid,
        query.getFiltersWithoutKeys(excludedKey),
        ...this.fieldContext.wrapAggregations(
          FilterBucket(
            "entityFilter",
            BoolMust(
              TermQuery("jsonLD.mentions.@type.keyword", this.options.entity)
            ),
            TermsBucket(
              this.key,
              this.options.actualField,
              omitBy(
                {
                  size: this.size,
                  order: this.getOrder(),
                  include: this.options.include,
                  exclude: this.options.exclude,
                  min_doc_count: this.options.min_doc_count
                },
                isUndefined
              )
            ),
            CardinalityMetric(`${this.key}_count`, this.options.actualField)
          )
        )
      )
    );
  }

  buildSharedQuery(query) {
    const state = this.state.getValue();
    const filters = Object.keys(state);

    // these are for the elasticsearch query
    const onFilters = filters.filter(filter =>
      this.state.isValue(filter, stateEnum.ON)
    );
    const notFilters = filters.filter(filter =>
      this.state.isValue(filter, stateEnum.NOT)
    );

    const onFilterTerms = map(onFilters, filter =>
      this.fieldContext.wrapFilter(TermQuery(this.options.actualField, filter))
    );
    const notFilterTerms = map(notFilters, filter =>
      this.fieldContext.wrapFilter(TermQuery(this.options.actualField, filter))
    );

    // these are for displaying to the user
    const generateDisplayedFilters = (fs, prefix) => {
      const prefixString = prefix ? `${prefix} ` : "";
      return map(fs, filter => ({
        name: this.options.title || this.translate(this.options.field),
        value: prefixString + this.translate(filter),
        id: this.options.id,
        remove: () => {
          this.state = this.state.remove(filter);
        }
      }));
    };
    const selectedFilters = generateDisplayedFilters(onFilters).concat(
      generateDisplayedFilters(notFilters, "NOT")
    );

    // returns BoolMust or BoolShould depending if we specified AND or OR
    const boolBuilder = this.getBoolBuilder();
    if (onFilterTerms.length > 0 || notFilterTerms.length > 0) {
      const newQuery = query
        .addQuery(boolBuilder(onFilterTerms))
        .addFilter(this.uuid, boolBuilder(onFilterTerms))
        .addFilter(this.uuid, BoolMustNot(notFilterTerms))
        .addSelectedFilters(selectedFilters);
      return newQuery;
    }
    return query;
  }
}
