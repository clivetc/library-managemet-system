import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password: string;

  constructor() {
    super();
    this.password = ""; // Initialize it with an empty string or another default value
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  },
);

export default User;
