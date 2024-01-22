import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import User from "./user";

class Appointment extends Model {
	public id!: string;
	public email!: string;
	public Phonenumber!: string;
	public date!: Date;
}

Appointment.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		email: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		Phonenumber: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize,
		timestamps: true,
		tableName: "appointments",
	},
);

Appointment.belongsTo(User, {
	foreignKey: "userId",
});

export default Appointment;
