import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public available!: boolean;
  public imageUrl!: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
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
    imageUrl: {
      type: new DataTypes.STRING(256), // Define the maximum length for the image URL
    },
  },
  {
    sequelize,
    tableName: "books",
  },
);

export default Book;
