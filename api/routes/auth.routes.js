import express from "express";
import AuthController from "../controllers/auth.controller.js";

const AuthRouter = express.Router();
const authController = new AuthController();
AuthRouter.post("/signup", authController.signUp);
AuthRouter.post("/signin", authController.signIn);

export default AuthRouter;
