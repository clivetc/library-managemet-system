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
		ssl: {
			require: true,
			rejectUnauthorized: false, // This option allows self-signed certificates, you can adjust it based on your certificate setup
		},
	},
});

export default sequelize;
