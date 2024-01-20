import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Book extends Model {
	public id!: string;
	public title!: string;
	public author!: string;
	public available!: boolean;
	public createdAt!: Date;
	public updatedAt!: Date;
	public availabledate!: Date;
	public imageurl!: string;
	public description!: string;
}

Book.init(
	{
		id: {
			type: DataTypes.UUID, // Use UUID data type
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},

		title: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		author: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		available: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		availabledate: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		imageurl: {
			type: new DataTypes.STRING(256),
		},
		description: {
			type: new DataTypes.STRING(256),
		},
	},
	{
		sequelize,
		timestamps: true,
		tableName: "books",
		// schema: "library",
	},
);

export default Book;
