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
		return res.status(201).json(newProduct);
	}
	async list(_req: Request, res: Response, _next: NextFunction): Promise<void | Response> {
		const products = await this._service.list();
		return res.status(200).json(products);
	}
	async find(req: Request, res: Response, _next: NextFunction): Promise<void | Response> {
		const { id } = req.params;
		const product = await this._service.find(Number(id));
		return res.status(200).json(product);
	}
}

export default new ProductController();