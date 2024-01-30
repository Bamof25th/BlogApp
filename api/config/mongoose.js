import mongoose from "mongoose";
import  dotenv  from 'dotenv';

dotenv.config();

const url = process.env.DB_URL;

export const connectusingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb Connected Using Mongoose.");
  } catch (err) {
    console.log("Error connecting to the database.");
    console.log(err);
  }
};

// mongoose.connect(
//     "mongodb+srv://baghelab1312:baghelab1312@blogapp.jko5amx.mongodb.net/?retryWrites=true&w=majority"
//   );
