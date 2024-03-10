import express from "express";
import CommentController from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post("/create", verifyToken, commentController.createComment);
commentRouter.get("/getcomments/:postId", commentController.getComment);
commentRouter.put(
  "/likecomment/:commentId",
  verifyToken,
  commentController.likeComments
);
commentRouter.put(
  "/editcomment/:commentId",
  verifyToken,
  commentController.editComments
);
commentRouter.delete(
  "/delete/:commentId",
  verifyToken,
  commentController.deleteComments
);

export default commentRouter;
