import express from "express";
import { connectusingMongoose } from "./config/mongoose.js";
import  dotenv  from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send({ message: "I am Aniket" });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
  connectusingMongoose();
});
