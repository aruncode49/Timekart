import express from "express";
import dotenv from "dotenv";
import { connectMongoDb } from "./config/db.js";

// Access .env
dotenv.config();

// express app instance
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// connect mongodb
connectMongoDb();

app.get("/", (req, res) => {
  res.send("Welcome to ecommerce project");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
