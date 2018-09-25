import * as R from 'ramda';
const makeExact = str => (str.length === 0 ? str : `"${str}"`);
export const formatText = (exact, str) => (exact ? makeExact(str) : str);

const fromatEntry = entry => `${entry.flag} ${formatText(entry.exact, entry.text)}`;
const addEntryTo = (str, entry) => `${str} ${fromatEntry(entry)}`;

export const TextSearchQueryBuilder = (search, flags, fields) => {
  let query = R.reduce((str, entry) => addEntryTo(str, entry), '', flags || []);
  query = search ? addEntryTo(query, search) : query;
  // Because first symbol is essentially meaningless
  query = query.slice(3);
  return { simple_query_string: { query, fields, default_operator: 'AND' } };
};
