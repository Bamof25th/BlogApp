import express from "express";
import UserController from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRoute = express.Router();

const userController = new UserController();

userRoute.put("/update/:userId", verifyToken, userController.updateUser);
userRoute.delete("/delete/:userId", verifyToken, userController.deleteUser);
userRoute.post("/signout", userController.signOut);

export default userRoute;
  