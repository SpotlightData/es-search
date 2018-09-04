export function RelaxedSearch(query, options) {
  if (!query) {
    return;
  }
  return {
    multi_match: Object.assign({ query: `.*${query}.*` }, options)
  };
}
