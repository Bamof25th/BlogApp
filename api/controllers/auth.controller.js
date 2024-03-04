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
        process.env.JWT_SECRET_TOKEN,
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

  googleIn = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    console.log(req.body);
    try {
      let user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN);
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);

        const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);
        const newUser = new User({
          username:
            name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN);
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
