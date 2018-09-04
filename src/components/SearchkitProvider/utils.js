import * as R from "ramda";

import qs from "qs";
import {
  // queryUrlToObject,
  queryObjectToString
} from "@spotlightdata/nanowire-extensions/lib/helpers/request";

const encodeObjUrl = obj =>
  qs.stringify(obj, { encode: true, encodeValuesOnly: true });
const decodeObjString = str => qs.parse(str);
const wrapQuery = str => `"${str}"`;
const unwrapQuery = str => (str === null ? "" : R.replace(/"/gm, "", str));

// Replace with nanowire extensions one when it's fixed
function queryUrlToObject(search) {
  const string = search.indexOf("?") === 0 ? search.slice(1) : search;
  if (string.length === 0) {
    return {};
  }

  return string.split("&").reduce((dict, pair) => {
    const eqIndex = pair.indexOf("=");
    const key = pair.slice(0, eqIndex);
    const value = pair.slice(eqIndex + 1, pair.length);
    // const [key, value] = pair.split('=');
    return { ...dict, [decodeURI(key)]: decodeURI(value) };
  }, {});
}

export const stateFromQuery = key =>
  R.pipe(
    url => {
      const query = queryUrlToObject(url);
      return query[key] !== undefined ? query[key] : '""';
    },
    unwrapQuery,
    decodeObjString,
    obj => {
      if (typeof object !== "object" || !obj.date1) {
        return obj;
      }
      // A fix when when miliseconds are strings rather than numbers
      return {
        ...obj,
        date1: {
          min: parseInt(obj.date1.min, 10),
          max: parseInt(obj.date1.max, 10)
        }
      };
    }
  );

export function updateSKHistory(history, queryKey, state) {
  const query = queryUrlToObject(history.location.search);
  const prevState = stateFromQuery(queryKey)(history.location.search);
  const newState = R.mergeDeepRight(prevState, state);
  const objectUrl = encodeObjUrl(newState);

  const newQuery = R.assoc(queryKey, wrapQuery(objectUrl), query);
  const historyState = {
    ...history.location,
    search: queryObjectToString(newQuery)
  };
  return historyState;
}
