'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return await queryInterface.createTable('products', {
			code: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cost_price: {
				type: Sequelize.DECIMAL(9,2),
				allowNull: false,
			},
			sales_price: {
				type: Sequelize.DECIMAL(9,2),
				allowNull: false,
			},
		});
	},

	async down (queryInterface, _Sequelize) {
		return await queryInterface.dropTable('products');
	}
};
