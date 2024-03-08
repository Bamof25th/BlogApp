import { errorHandler } from "./../utils/error.js";
import Comment from "./../models/comment.model.js";

export default class CommentController {
  createComment = async (req, res, next) => {
    try {
      const { userId, postId, content } = req.body;
      console.log(req.user);
      if (userId !== req.user.userId) {
        return next(
          errorHandler(403, "You are not alllowed to create this comment")
        );
      }
      const newComment = new Comment({
        content,
        postId,
        userId,
      });

      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  };
  getComment = async (req, res, next) => {
    try {
      let comments = await Comment.find({ postId: req.params.postId }).sort({
        createdAt: -1,
      });
      //console.log(comments);
      res.status(201).json(comments);
    } catch (error) {
      next(error);
    }
  };
}
