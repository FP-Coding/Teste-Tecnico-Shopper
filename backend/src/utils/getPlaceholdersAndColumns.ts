import { snakeize } from 'camelize-snakeize-ts';

interface IPlaceholderAndColumns { 
	columns: string, placeholders: string 
}

function getPlaceholdersAndColumns<T> (data: T): IPlaceholderAndColumns {
	const columns = Object.keys(snakeize(data)).join(', ');

	const placeholders = Object.keys(data as object).map((_) => '?').join(', ');

	return { columns, placeholders };
}

export default getPlaceholdersAndColumns;