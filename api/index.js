import express from "express";
import { connectusingMongoose } from "./config/mongoose.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send({ message: "I am Aniket" });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
  connectusingMongoose();
});
