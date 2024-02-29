import User from "./../models/user.model.js";
import bcryptjs from "bcryptjs";

export default class AuthController {
  async signUp(req, res) {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    try {
      await newUser.save();

      res.status(200).send("signed in successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
