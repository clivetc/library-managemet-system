"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"books",
			{
				id: Sequelize.UUID,
				title: Sequelize.STRING,
				author: Sequelize.STRING,
				available: Sequelize.BOOLEAN,
				availabledate: Sequelize.STRING,
				imageurl: Sequelize.STRING,
				description: Sequelize.STRING,
			},
			{
				schema: "library",
			},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("books", {
			schema: "library",
		});
	},
};
