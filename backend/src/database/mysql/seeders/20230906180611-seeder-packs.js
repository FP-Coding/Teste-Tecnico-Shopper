'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('packs', [{
			pack_id: 1000,
			product_id: 18,
			qty: 6
		},
		{
			pack_id: 1010,
			product_id: 24,
			qty: 1
		},
		{
			pack_id: 1010,
			product_id: 26,
			qty: 1
		},
		{
			pack_id: 1020,
			product_id: 19,
			qty: 3
		},
		{
			pack_id: 1020,
			product_id: 21,
			qty: 3
		}
		], {});
	},

	async down (queryInterface, _Sequelize) {
		return await queryInterface.bulkDelete('Pack', null, {});
	}
};
