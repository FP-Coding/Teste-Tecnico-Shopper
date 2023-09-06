import ProductModel from '../models/Product.model';
import { SimpleService } from '../interfaces/IService';
import IProduct from '../interfaces/IProduct';
import AbstractService from './AbstractService.service';
import { SimpleModel } from '../interfaces/IModel';

class ProductService extends AbstractService<IProduct> implements SimpleService<IProduct> {
	constructor(model: SimpleModel<IProduct> = new ProductModel()) {
		super(model);
	}

	async create(product: IProduct): Promise<IProduct> {
		const newProduct = await super.create(product); 
		return newProduct;
	}
	async list(): Promise<IProduct[]> {
		throw new Error('Method not implemented.');
	}
	async find(_id: number): Promise<IProduct | null> {
		throw new Error('Method not implemented.');
	}
}

export default ProductService;