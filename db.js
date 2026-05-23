require("dotenv").config();

const mysql = require("mysql2");

console.log(process.env.DB_PASSWORD);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mileena26*",
  database: "zodiacweb"
});

connection.connect(err => {
  if (err) {
    console.error("Erro:", err);
  } else {
    console.log("Conectado!");
  }
});

module.exports = connection;