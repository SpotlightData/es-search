import * as R from 'ramda';

import qs from 'qs';
import {
  queryUrlToObject,
  queryObjectToString,
} from '@spotlightdata/nanowire-extensions/lib/helpers/request';

const delimiter = '+';

const encodeObjUrl = obj => {
  return qs.stringify(obj, { encode: true, encodeValuesOnly: false, delimiter });
};
const decodeObjString = str => {
  return qs.parse(str, { delimiter });
};

function cleanDates(state) {
  if (typeof state !== 'object') {
    return state;
  }
  return Object.entries(state).reduce((newState, [key, value]) => {
    const newValue = !key.includes('date')
      ? value
      : {
          min: parseInt(value.min, 10),
          max: parseInt(value.max, 10),
        };
    return { ...newState, [key]: newValue };
  }, {});
}

export const stateFromQuery = key =>
  R.pipe(
    url => queryUrlToObject(url)[key] || '',
    decodeObjString,
    cleanDates
  );

export function updateSKHistory(history, queryKey, state) {
  const query = queryUrlToObject(history.location.search);
  const search = R.pipe(
    encodeObjUrl,
    R.tap(console.log),
    str => R.assoc(queryKey, str, query),
    queryObjectToString
  )(state);

  const historyState = {
    ...history.location,
    search,
  };
  return historyState;
}
