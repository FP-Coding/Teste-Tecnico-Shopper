import { snakeize } from 'camelize-snakeize-ts';

interface IPlaceholderAndColumns { 
	columns: string, placeholders: string 
}

function getPlaceholdersAndColumns<T> (data: T): IPlaceholderAndColumns {
	const fields = Object.keys(snakeize(data));
	const columns = fields.join(', ');

	const placeholders = fields.map((_) => '?').join(', ');

	return { columns, placeholders };
}

export default getPlaceholdersAndColumns;