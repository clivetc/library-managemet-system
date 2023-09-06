import mysql, { Connection } from "mysql";

const DataBase = process.env.DBNAME;

const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "mailbox",
  password: "Samaita89.",
});

db.connect((err: mysql.MysqlError) => {
  if (err) {
    console.log({ ERROR: err });
    throw err;
  }

  console.log("Connected to the Database");
});

db.end((err: any) => {
  if (err) {
    console.log({ err });
    throw err;
  }

  console.log("Database disconnected");
});

export default db;
