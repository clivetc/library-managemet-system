import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Posts extends Model {
	public id!: string;
	public post!: string;
	public enabled!: boolean;
}

Posts.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		post: {
			type: new DataTypes.STRING(256),
			allowNull: false,
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		tableName: "posts",
		// schema: "library",
	},
);

export default Posts;
