export function RelaxedSearch(query, options) {
  if (!query) {
    return;
  }
  return {
    simple_query_string: Object.assign({ query }, options)
  };
  // return {
  //   multi_match: Object.assign({ query: `.*${query}.*` }, options)
  // };
}
