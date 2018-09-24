import * as R from 'ramda';
const makeExact = str => (str.length === 0 ? str : `"${str}"`);
const formatText = (exact, str) => (exact ? makeExact(str) : str);

export const TextSearchQueryBuilder = (search, flags, fields) => {
	const inital = search ? formatText(search.exact, search.text) : '';
	const query = R.reduce(
		(str, entry) => `${str} ${entry.flag} ${formatText(entry.exact, entry.text)}`,
		inital,
		flags || []
	);
	return { simple_query_string: { query, fields } };
};
