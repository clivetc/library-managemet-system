import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Admin extends Model {
	public id!: string;
	public username!: string;
	public firstName!: string;
	public lastName!: string;
	public password!: string;
}

Admin.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		username: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		firstName: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		lastName: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		password: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		isadmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false, // Set the isadmin flag to false by default
		},
	},
	{
		sequelize,
		tableName: "admins",
	},
);

export default Admin;
