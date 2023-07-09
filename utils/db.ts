import mysql, { Connection } from "mysql";

const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

db.connect((err: any) => {
  if (err) {
    throw err;
  }

  console.log("Connected to the Database");
});

db.end((err: any) => {
  if (err) {
    throw err;
  }

  console.log("Database disconnected");
});

export default db;
