import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT;

app.listen(3000, () => {
  console.log(`Server running on ${PORT}`);
});
