import * as R from 'ramda';
const makeExact = str => (str.length === 0 ? str : `"${str}"`);
export const formatText = (exact, str) => (exact ? makeExact(str) : str);

const fromatEntry = entry => `${entry.flag} ${formatText(entry.exact, entry.text)}`;

export const TextSearchQueryBuilder = (search, flags, fields) => {
	const inital = search ? fromatEntry(search) : '';
	const query = R.reduce((str, entry) => `${str} ${fromatEntry(entry)}`, inital, flags || []);
	return { simple_query_string: { query, fields } };
};
