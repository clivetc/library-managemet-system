import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Admin extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
}

Admin.init(
  {
    id: {
      type: DataTypes.UUID, // Use UUID data type
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    username: {
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
    tableName: "admins",
  },
);

export default Admin;
