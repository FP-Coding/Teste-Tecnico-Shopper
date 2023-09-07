'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return await queryInterface.createTable('packs', { 
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			pack_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'products',
					key: 'code'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			product_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'products',
					key: 'code'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			qty: {
				type: Sequelize.BIGINT,
				allowNull: false,
			} 
		});
    
	},

	async down (queryInterface, _Sequelize) {
		return await queryInterface.dropTable('packs');
	}
};
