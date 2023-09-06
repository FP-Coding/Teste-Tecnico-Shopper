import { Model, BIGINT  } from 'sequelize';
import Product from './Product.model';
import db from '.';

class Pack extends Model {
	declare readonly code: number;
	declare name: string;
	declare costPrice: number;
	declare salesPrice: number;
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

Product.belongsTo(Pack, { foreignKey: 'packId', as: 'pack' });

Pack.hasMany(Product, { foreignKey: 'productId', as: 'products' });


export default Pack;