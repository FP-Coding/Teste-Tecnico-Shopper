import { ModelStatic } from 'sequelize';
import { SimpleService } from '../interfaces/IService';
import IProduct from '../interfaces/IProduct';
import ProductModel from '../database/mysql/models/Product.model';


class ProductService implements SimpleService<IProduct> {
	private _model: ModelStatic<ProductModel>;
	constructor(model: ModelStatic<ProductModel> = ProductModel) {
		this._model = model;
	}

	async create(product: Omit<IProduct, 'code'>): Promise<IProduct> {
		const newProduct = await this._model.create(product); 
		return newProduct;
	}
	async list(): Promise<IProduct[]> {
		const products = await this._model.findAll();
		return products;
	}
	async find(id: number): Promise<IProduct | null> {
		const product = await this._model.findByPk(id);
		return product;
	}
}

export default ProductService;