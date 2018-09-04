import * as R from "ramda";

import qs from "qs";
import {
  // queryUrlToObject,
  queryObjectToString
} from "@spotlightdata/nanowire-extensions/lib/helpers/request";

const encodeObjUrl = obj => {
  const parsed = qs.stringify(obj, { encode: true, encodeValuesOnly: true });
  return parsed.replace(/&/g, "+");
};
const decodeObjString = str => {
  const clean = str.replace(/\+/g, "&");
  return qs.parse(clean);
};

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
    return { ...dict, [decodeURI(key)]: decodeURI(value) };
  }, {});
}

function cleanDates(obj) {
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

export const stateFromQuery = key =>
  R.pipe(
    url => queryUrlToObject(url)[key] || "",
    decodeObjString,
    cleanDates
  );

export function updateSKHistory(history, queryKey, state) {
  const query = queryUrlToObject(history.location.search);
  const prevState = stateFromQuery(queryKey)(history.location.search);
  const search = R.pipe(
    R.mergeDeepRight(prevState),
    encodeObjUrl,
    str => R.assoc(queryKey, str, query),
    queryObjectToString
  )(state);

  const historyState = {
    ...history.location,
    search
  };
  return historyState;
}
