const { Client } = require("pg");

const client = new Client({
  user: process.env.PGS_USER,
  password: process.env.PGS_PSW,
  host: process.env.PGS_HOST,
  port: process.env.PGS_PORT,
  database: process.env.PGS_DB,
});

client.connect();
client
  .query("select now()")
  .then((res) => console.log("DB connected successfully", res.rows[0]));

module.exports = client;
