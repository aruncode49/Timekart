import express from "express";
import dotenv from "dotenv";

// Access .env
dotenv.config();

// PORT
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to ecommerce project");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
