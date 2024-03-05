import express from "express";
import { connectusingMongoose } from "./config/mongoose.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import AuthRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.routes.js";
const app = express();

// * Body parser middleware
app.use(express.json());
app.use(cookieParser());

//* envs
dotenv.config();
const port = process.env.PORT;

// * Routes
app.use("/api/user", userRoute);
app.use("/api/auth", AuthRouter);
app.use("/api/post", postRouter);

// * error handeling midlleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// * listen to the port
app.listen(port, () => {
  console.log(`Server started on ${port}`);
  connectusingMongoose();
});
