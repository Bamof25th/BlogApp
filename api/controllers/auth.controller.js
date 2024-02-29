import { errorHandler } from "../utils/error.js";
import User from "./../models/user.model.js";
import bcryptjs from "bcryptjs";

export default class AuthController {
  async signUp(req, res, next) {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
        next(errorHandler(400, "All feilds are required!"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    try {
      await newUser.save();

      res.status(200).json("signed in successfully");
    } catch (error) {
      next(error);
    }
  }
}
