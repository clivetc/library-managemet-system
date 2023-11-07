import sequelize from "./config/sequelize";
import Admin from "./model/admin";
import Book from "./model/books";
import Posts from "./model/posts";
import User from "./model/user";

async function initializeSequelize() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
    await sequelize.sync({ force: true });
    await User.sync({ force: true });
    await Book.sync({ force: true });
    await Admin.sync({ force: true });
    await Posts.sync({ force: true });
    console.log("Models synchronized with the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

initializeSequelize();
