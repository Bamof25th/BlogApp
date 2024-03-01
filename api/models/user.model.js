import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      maxLength: [25, "Name cant be greqater than 25 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      mach: [/.+\@.+\../, "Please enter a Valid email"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
