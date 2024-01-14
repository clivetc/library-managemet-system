"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"users",
			{
				id: Sequelize.UUID,
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				firstName: Sequelize.STRING,
				lastName: Sequelize.STRING,
				Password: Sequelize.STRING,
				isAdmin: Sequelize.BOOLEAN,
			},
			{
				schema: "library",
			},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("users", {
			schema: "library",
		});
	},
};
