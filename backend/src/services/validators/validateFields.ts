import { AnySchema } from 'joi';
import idSchema, { PackSchema } from './schema';
import { salesPriceSchema } from './schema';
import { ProductSchema } from './schema';
import TypeError from '../../errors/TypeErrors';
import HTTPError from '../../errors/HTTPError';
import IProduct, { IProductPrice } from '../../interfaces/IProduct';
import IPack from '../../interfaces/IPack';

const validateSchema = <T>(schema: AnySchema, info: T, statusCode: number): void => {
	const { error } = schema.validate(info);
	if (error) throw new HTTPError(error.message, statusCode);
};

export const validateId = (id: number) => {
	validateSchema<number>(idSchema, id, TypeError.BAD_REQUEST);
};

export const validateProductFields = (productInfo: IProduct) => {
	validateSchema<IProduct>(ProductSchema, productInfo, TypeError.BAD_REQUEST);
};

export const validateSalesPrice = (salesPrice: IProductPrice) => {
	validateSchema<IProductPrice>(salesPriceSchema, salesPrice, TypeError.BAD_REQUEST);
};

export const validatePackFields = (dataPack: IPack) => {
	validateSchema<IPack>(PackSchema, dataPack, TypeError.BAD_REQUEST);
};