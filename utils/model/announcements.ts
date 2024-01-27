import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Announcements extends Model {
	public id!: string;
	public title!: string;
	public description!: string;
	public category!: string;
	public date!: Date;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Announcements.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		category: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: "createdAt",
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: "updatedAt",
		},
	},
	{
		sequelize,
		timestamps: true,
		tableName: "announcements",
	},
);

export default Announcements;
