import { errorHandler } from "../utils/error.js";
import User from "./../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
      return next(errorHandler(400, "All feilds are required!"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    try {
      await newUser.save();
      res.status(200).json("Account created successfully");
    } catch (error) {
      next(error);
    }
  }

  signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      next(errorHandler(400, "All feilds are required!"));
    }
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(400, "User not found"));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, "Incorrect Password"));
      }
      const token = jwt.sign(
        { userId: validUser._id, username: validUser.username },
        "ASduhkjbdklba123&*#W&#",
        { expiresIn: "1d" }
      );
      const { password: pass, ...rest } = validUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
}
