import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import { connectMongoDb } from "./config/db.js";

// Access .env
dotenv.config();

// express app instance
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// connect mongodb
connectMongoDb();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ecommerce project");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
