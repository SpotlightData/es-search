export function EntityQuery(entity) {
  return (query, options = {}) => {
    if (!query) {
      return null;
    }

    let queryArr = [query];
    // parse query so we can handle ANDs
    if (query.includes("AND")) {
      queryArr = query.split("AND");
    }

    // construct query from query segments
    queryArr = queryArr.map(segment => ({
      nested: {
        path: "jsonLD.mentions",
        query: {
          // filtered: {
          //   query: {
          //     bool: {
          //       must: [
          //         { match: { "jsonLD.mentions.@type.keyword": entity } },
          //         {
          //           simple_query_string: Object.assign({ query: segment }, options)
          //         }
          //       ]
          //     }
          //   }
          // },
          // filter: {

          // }
          bool: {
            must: [
              { match: { "jsonLD.mentions.@type.keyword": entity } },
              {
                simple_query_string: Object.assign({ query: segment }, options)
              }
            ]
          }
        }
      }
    }));

    return {
      bool: {
        must: queryArr
      }
    };
  };
}
