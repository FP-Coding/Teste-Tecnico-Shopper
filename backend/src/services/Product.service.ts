import { ModelStatic } from 'sequelize';
import Service from '../interfaces/IService';
import IProduct, { IProductPrice, IProductUpdated, IUpdatePrice } from '../interfaces/IProduct';
import ProductModel from '../database/mysql/models/Product.model';
import HTTPError from '../errors/HTTPError';
import TypeError from '../errors/TypeErrors';
import { validateId, validateProductFields, validateSalesPrice } from './validators/validateFields';


class ProductService implements Service<IProduct> {
	private _model: ModelStatic<ProductModel>;
	constructor(model: ModelStatic<ProductModel> = ProductModel) {
		this._model = model;
	}
		
	async create(product: IProduct): Promise<IProduct> {
		validateProductFields(product);
		const newProduct = await this._model.create(product as Omit<IProduct, 'code'>); 
		return newProduct;
	}
	
	async list(): Promise<IProduct[]> {
		const products = await this._model.findAll();
		return products;
	}
	
	async find(id: number): Promise<IProduct> {
		validateId(id);
		const product = await this._model.findByPk(id);
		if (!product) throw new HTTPError('Produto não encontrado', TypeError.NOT_FOUND);
		return product.dataValues;
	}
	
	async update(code: number, data: IProductPrice): Promise<boolean | IProductUpdated> {
		let errors: string[] = [`Produto com o code ${code}`];
		validateSalesPrice(data);
		const product = await this.find(code);
		if (data.salesPrice < product.costPrice) errors.push('Preço de venda é menor que o custo');
		const differenceBetweenPrices = Math.abs(data.salesPrice - product.salesPrice);
		const TenPercentOfSalesPrice = Math.round(product.salesPrice * 0.1);
		if (differenceBetweenPrices > TenPercentOfSalesPrice) errors.push('Preço de reajuste é maior ou menor que 10%');
		if(errors.length > 1) {
			const errorsFounded = errors.join('; ');			
			errors = [];
			throw new HTTPError(errorsFounded, TypeError.BAD_REQUEST);
		}
		const [affectedRows] = await this._model.update(data, { where: { code } });
		const { name, salesPrice } = product;
		const updatedPrice = { 
			code, 
			name, 
			pastSalesPrice: Number(salesPrice), 
			newSalesPrice:  data.salesPrice 
		};
		return affectedRows > 0 ? updatedPrice : false;
	}
	
	async delete(code: number): Promise<boolean> {
		const affectedRows = await this._model.destroy({ where: { code } });
		return affectedRows !== 0;
	}
}

export default ProductService;