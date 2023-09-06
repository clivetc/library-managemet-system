import { Sequelize } from "sequelize";

const sequelize = new Sequelize("librarydb", "root", "Samaita89.", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
