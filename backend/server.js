import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
// Routes
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

// ====================MongoDB=============
connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
