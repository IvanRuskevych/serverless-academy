const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const countryRouter = require("./routers/country.router");

const app = express();
const formatLogger = app.get(".env") === "development" ? "dev" : "short";

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.get("/", countryRouter);
app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;