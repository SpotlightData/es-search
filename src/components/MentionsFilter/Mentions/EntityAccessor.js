import { Accessor, NestedBucket, TermsBucket } from "searchkit";

export class EntityAccessor extends Accessor {
  static create() {
    return new EntityAccessor();
  }

  getEntities() {
    return this.getAggregations(["mentions", "entities", "buckets"], []);
  }

  buildOwnQuery(query) {
    return query.setAggs(
      NestedBucket(
        "mentions",
        "jsonLD.mentions",
        TermsBucket("entities", "jsonLD.mentions.@type.keyword")
      )
    );
  }

  buildSharedQuery(query) {
    return query.setAggs(
      NestedBucket(
        "mentions",
        "jsonLD.mentions",
        TermsBucket("entities", "jsonLD.mentions.@type.keyword")
      )
    );
  }
}
