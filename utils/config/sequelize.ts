import { Sequelize } from "sequelize";

const sequelize = new Sequelize("librarydb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
