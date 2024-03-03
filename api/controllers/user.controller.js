import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from './../models/user.model.js';

export default class UserController {
  updateUser = async (req, res, next) => {
    console.log(req.user);
    if (req.user.userId !== req.params.userId) {
      return next(
        errorHandler(401, "You are not authorized to update this user")
      );
    }
    if (req.body.password) {
      if (req.body.password < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 12);
    }
    if (req.body.username.length < 4 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 5 to 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username can not contain spaces"));
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updateUser._doc;
      res.status(200).json(rest);
    } catch (error) {
        console.log(error)
      next(error);
    }
  };
}
