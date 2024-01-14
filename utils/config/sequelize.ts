import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	database: process.env.POSTGRES_DATABASE,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	dialect: "postgres",
	define: {
		timestamps: false,
	},
	dialectOptions: {
		ssl: false, // Disable SSL
	},
});

export default sequelize;
