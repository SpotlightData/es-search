import { Accessor, NestedBucket, TermsBucket } from 'searchkit';

export class EntityAccessor extends Accessor {
  static create() {
    return new EntityAccessor();
  }

  getEntities() {
    return this.getAggregations(['mentions', 'entities', 'buckets'], []);
  }

  buildTermBucket() {
    return TermsBucket('entities', 'jsonLD.mentions.@type.keyword', { size: 1000 });
  }

  buildOwnQuery(query) {
    return query.setAggs(NestedBucket('mentions', 'jsonLD.mentions', this.buildTermBucket()));
  }

  buildSharedQuery(query) {
    return query.setAggs(NestedBucket('mentions', 'jsonLD.mentions', this.buildTermBucket()));
  }
}
