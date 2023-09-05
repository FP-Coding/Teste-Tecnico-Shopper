import IProduct from '../interfaces/IProduct';
import { SimpleModel } from '../interfaces/IModel';
import connection from './connection';

class ProductModel implements SimpleModel<IProduct> {
	create(obj: IProduct): Promise<IProduct> {
		throw new Error('Method not implemented.');
	}
	list(): Promise<IProduct[]> {
		throw new Error('Method not implemented.');
	}
	find(id: number): Promise<IProduct | null> {
		throw new Error('Method not implemented.');
	}

}