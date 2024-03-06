import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "./../models/user.model.js";

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
    console.log(req.body.username);
    if (req.body.username) {
      if (req.body.username.length < 4 || req.body.username.length > 20) {
        return next(
          errorHandler(400, "Username must be between 5 to 20 characters")
        );
      }
      if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Username can not contain spaces"));
      }
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
      console.log(error);
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    if (req.user.userId !== req.params.userId) {
      return next(
        errorHandler(401, "You are not allowed to delete this account")
      );
    }
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      next(error);
    }
  };
  signOut = async (req, res, next) => {
    //remove the token from the user
    try {
      res.clearCookie("access_token").status(200).json("signOut successfully");
    } catch (error) {
      next(error);
    }
  };
  getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "Only admin can perform this action"));
    }

    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order || "asc" ? 1 : -1;

      const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

      const usersWithoutPass = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest
      });

      const totalUsers = await User.countDocuments();
      const now = new Date();

      const oneMonthsAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );

      const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthsAgo },
      });

      res.status(200).json({
        usersWithoutPass,
        totalUsers,
        lastMonthUsers,
      });
    } catch (error) {
      next(error);
    }
  };
}
