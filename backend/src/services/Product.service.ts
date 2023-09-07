import { ModelStatic } from 'sequelize';
import Service from '../interfaces/IService';
import IProduct from '../interfaces/IProduct';
import ProductModel from '../database/mysql/models/Product.model';


class ProductService implements Service<IProduct> {
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
	
	async update(code: number, data: Partial<IProduct>): Promise<boolean> {
		const [affectedRows] = await this._model.update(data, { where: { code } });
		return affectedRows !== 0;
	}
	
	async delete(code: number): Promise<boolean> {
		const affectedRows = await this._model.destroy({ where: { code } });
		return affectedRows !== 0;
	}
}

export default ProductService;