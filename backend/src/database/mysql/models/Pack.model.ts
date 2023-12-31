import { Model, BIGINT } from 'sequelize';
import Product from './Product.model';
import db from '.';

class Pack extends Model {
	declare readonly id: number;
	declare packId: number;
	declare productId: number;
	declare qty: number;
}

Pack.init({
	id: {
		type: BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	packId: {
		type: BIGINT,
		allowNull: false,
		references: {
			model: Product,
			key: 'code'
		}
	},
	productId: {
		type: BIGINT,
		allowNull: false,
		references: {
			model: Product,
			key: 'code'
		}
	},
	qty: {
		type: BIGINT,
		allowNull: false,
	},
}, {
	underscored: true,
	sequelize: db,
	timestamps: false,
	modelName: 'Pack',
	tableName: 'packs'
});

Product.belongsTo(Pack,{
	targetKey: 'productId',
	foreignKey: 'code'
});

Pack.hasMany(Product,{
	foreignKey: 'code',
	sourceKey: 'productId'
});



export default Pack;