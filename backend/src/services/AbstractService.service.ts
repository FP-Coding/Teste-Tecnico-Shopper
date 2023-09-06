import { SimpleService } from '../interfaces/IService';
import IModel, { SimpleModel } from '../interfaces/IModel';


export default abstract class AbstractService<T> implements SimpleService<T> {
	protected model: IModel<T> | SimpleModel<T>;

	constructor(model: IModel<T> | SimpleModel<T>) {
		this.model = model;
	}
	async create(data: T): Promise<T> {
		const newData = await this.model.create(data);
		return newData;
	}
	async list(): Promise<T[]> {
		throw new Error('Method not implemented.');
	}
	async find(_id: number): Promise<T | null> {
		throw new Error('Method not implemented.');
	}
}