import { Request, Response, NextFunction } from 'express';
import { SimpleController } from '../interfaces/IController';
import { SimpleService } from '../interfaces/IService';
import IProduct from '../interfaces/IProduct';
import ProductService from '../services/Product.service';

class ProductController implements SimpleController {
	private _service: SimpleService<IProduct>;
	constructor(service = new ProductService()) {
		this._service = service;
	}
	async create(req: Request, res: Response, _next: NextFunction): Promise<void | Response> {
		const data = req.body;
		const newProduct = await this._service.create(data);
		return res.status(200).json(newProduct);
	}
	async list(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		throw new Error('Method not implemented.');
	}
	async find(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		throw new Error('Method not implemented.');
	}
}

export default ProductController;