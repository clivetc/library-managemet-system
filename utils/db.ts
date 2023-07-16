import mysql, { Connection } from "mysql";

const DataBase = process.env.DBNAME;

const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  database: DataBase,
});

db.connect((err: mysql.MysqlError) => {
  if (err) {
    throw err;
  }

  console.log("Connected to the Database");
});

db.end((err: mysql.MysqlError) => {
  if (err) {
    throw err;
  }

  console.log("Database disconnected");
});

export default db;
