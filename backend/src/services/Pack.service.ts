import { ModelStatic } from 'sequelize';
import { SimpleService } from '../interfaces/IService';
import IPack from '../interfaces/IPack';
import PackModel from '../database/mysql/models/Pack.model';
import { validateId, validatePackFields } from './validators/validateFields';

class PackService implements SimpleService<IPack> {
	private _model: ModelStatic<PackModel>;
	constructor(model: ModelStatic<PackModel> = PackModel) {
		this._model = model;
	}

	async create(data: Omit<IPack, 'id'>): Promise<IPack> {
		validatePackFields(data);
		const newPack = await this._model.create(data); 
		return newPack;
	}

	async list(): Promise<IPack[]> {
		const packs = await this._model.findAll();
		return packs;
	}

	async find(packId: number): Promise<IPack | IPack[] | null> {
		validateId(packId);
		const pack = await this._model.findAll({ where: { packId} });
		return pack;
	}
}

export default PackService;