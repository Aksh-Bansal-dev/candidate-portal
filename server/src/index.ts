import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// DB
mongoose.connect(`${process.env.DATABASE_URL}`, {}, () =>
  console.log("Connected to DB")
);

// ROUTES
app.use("/auth", authRoutes);

// LISTEN
const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => {
  console.log(`Server running on ${port}...`);
});
