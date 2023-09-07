import { ModelStatic } from 'sequelize';
import Service from '../interfaces/IService';
import IPack from '../interfaces/IPack';
import PackModel from '../database/mysql/models/Pack.model';
import ProductModel from '../database/mysql/models/Product.model';

class PackService implements Service<IPack> {
	private _model: ModelStatic<PackModel>;
	constructor(model: ModelStatic<PackModel> = PackModel) {
		this._model = model;
	}
	async create(data: Omit<IPack, 'id'>): Promise<IPack> {
		const newPack = await this._model.create(data); 
		return newPack;
	}
	async list(): Promise<IPack[]> {
		const packs = await this._model.findAll({ include: [{ model: ProductModel, as: 'Products' }]});
		return packs;
	}
	async find(id: number): Promise<IPack | null> {
		const pack = await this._model.findByPk(id);
		return pack;
	}
	async update(id: number, data: Partial<IPack>): Promise<boolean> {
		const [affectedRows] = await this._model.update(data, { where: { id } });
		return affectedRows !== 0;
	}
	async delete(id: number): Promise<boolean> {
		const affectedRows = await this._model.destroy({ where: { id } });
		return affectedRows !== 0;
	}

}

export default PackService;