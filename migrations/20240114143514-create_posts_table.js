"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"posts",
			{
				id: Sequelize.UUID,
				post: Sequelize.STRING,
				enabled: Sequelize.BOOLEAN,
			},
			{
				schema: "library",
			},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("posts");
	},
};
