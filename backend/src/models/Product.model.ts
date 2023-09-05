import 'dotenv/config';
import connection from './connection';
import IProduct from '../interfaces/IProduct';
import { SimpleModel } from '../interfaces/IModel';
import getPlaceholdersAndColumns from '../utils/getPlaceholdersAndColumns';
import { ResultCreate } from '../interfaces/InterfacesMysql';


const DB = process.env.MYSQL_DATABASE; 

class ProductModel implements SimpleModel<IProduct> {
	async create(product: IProduct): Promise<IProduct> {
		const { placeholders, columns } = getPlaceholdersAndColumns<IProduct>(product);
		const query = `INSERT INTO ${DB}.products (${columns}) VALUES (${placeholders})`;
		const [{ insertId }]: ResultCreate = await connection.execute(query, Object.values(product));
		return { code: insertId, ...product };
	}
	async list(): Promise<IProduct[]> {
		throw new Error('Method not implemented.');
	}
	async find(_id: number): Promise<IProduct | null> {
		throw new Error('Method not implemented.');
	}
}

export default ProductModel;