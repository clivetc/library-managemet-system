import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Book extends Model {
  public id!: string;
  public title!: string;
  public author!: string;
  public available!: boolean;
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
      // Define the availabledate property
      type: DataTypes.DATE, // Use DataTypes.DATE for date values
      allowNull: true, // Set allowNull based on your requirements
    },
    imageurl: {
      type: new DataTypes.STRING(256), // Define the maximum length for the image URL
    },
    description: {
      type: new DataTypes.STRING(256), // Define the maximum length for the image URL
    },
  },
  {
    sequelize,
    tableName: "books",
  },
);

export default Book;
