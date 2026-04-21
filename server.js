// importing modules and packages
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mainRouter from "./app.js";

// configuring dotenv for env variables
dotenv.config();
mongoose.connect(process.env.MONGO_URI)

const app=express();
// app level middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
