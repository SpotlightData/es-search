import * as R from "ramda";

import qs from "qs";
import {
  queryUrlToObject,
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

export const stateFromQuery = key =>
  R.pipe(
    url => queryUrlToObject(url)[key] || "",
    decodeObjString
  );

export function updateSKHistory(history, queryKey, state) {
  const query = queryUrlToObject(history.location.search);
  const search = R.pipe(
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
