import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";
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

app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
  console.log(`Server running on ${PORT}`);
});

app.use('/server/user',userRouter)
app.use('/server/auth',authRouter)

app.use((error,req,res,next)=>{
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error"

  return res.status(statusCode).json({
    success : false,
    message,
    statusCode
  })
})
