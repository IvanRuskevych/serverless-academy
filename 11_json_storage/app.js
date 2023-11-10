const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const dataRouter = require("./routes/data.routes");

const app = express();

app.use(logger("short"));
app.use(cors());
app.use(express.json());

app.use("/", dataRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

module.exports = app;
