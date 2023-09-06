import { Model, STRING, INTEGER ,DECIMAL } from 'sequelize';
import db from '.';

class Product extends Model {
	declare readonly code: number;
	declare name: string;
	declare costPrice: number;
	declare salesPrice: number;
}

Product.init({
	code: {
		type: INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: STRING(100),
		allowNull: false,
	},
	costPrice: {
		type: DECIMAL(9,2),
		allowNull: false,
	},
	salesPrice: {
		type: DECIMAL(9,2),
		allowNull: false,
	},
}, {
	underscored: true,
	sequelize: db,
	timestamps: false,
	modelName: 'Product',
	tableName: 'products'
});

export default Product;