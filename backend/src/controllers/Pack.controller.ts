import { Request, Response, NextFunction } from 'express';
import { SimpleController } from '../interfaces/IController';
import { SimpleService } from '../interfaces/IService';
import IPack from '../interfaces/IPack';
import PackService from '../services/Pack.service';

class PackController implements SimpleController {
	private _service: SimpleService<IPack>;
	constructor(service = new PackService()) {
		this._service = service;
	}
	
	async create(req: Request, res: Response, _next: NextFunction): Promise<void | Response> {
		const data = req.body;
		const newPack = await this._service.create(data);
		return res.status(201).json(newPack);
	}

	async list(_req: Request, res: Response, _next: NextFunction): Promise<void | Response> {
		const packs = await this._service.list();
		return res.status(200).json(packs);
	}
	
	async find(req: Request, res: Response, _next: NextFunction): Promise<void | Response> {
		const { packId } = req.params;
		const pack = await this._service.find(Number(packId));
		return res.status(200).json(pack);
	}
}

export default new PackController();