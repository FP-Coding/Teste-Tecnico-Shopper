import Joi from 'joi';

const baseNumberSchema = Joi.number().integer().required();

const idSchema = baseNumberSchema.label('Id/Code');

const priceSchema = Joi.number().precision(2).required();

export const salesPriceSchema = Joi.object({
	salesPrice: priceSchema.label('Preço de Venda')
});

export const ProductSchema = Joi.object({
	code: idSchema,
	name: Joi.string().max(100).required().label('nome'),
	costPrice: priceSchema.label('Preço de Custo'),
	salesPrice: priceSchema.label('Preço de Venda')
});

export const PackSchema = Joi.object({
	packId: baseNumberSchema.label('packId'),
	productId: baseNumberSchema.label('productId'),
	qty: baseNumberSchema.label('Quantidade(qty)')
});

export default idSchema;