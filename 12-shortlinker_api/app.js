import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
dotenv.config();

import linksRouter from "./routes/links.routes.js";

const app = express();

app.use(logger("short"));
app.use(cors());
app.use(express.json());

app.use("/", linksRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export { app };
