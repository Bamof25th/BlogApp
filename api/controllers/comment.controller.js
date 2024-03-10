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
  likeComments = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, "Comment not found"));
      }
      const userIndex = comment.likes.indexOf(req.user.userId);
      if (userIndex === -1) {
        comment.numberOfLikes += 1;
        comment.likes.push(req.user.userId);
      } else {
        comment.numberOfLikes -= 1;
        comment.likes.splice(userIndex, 1);
      }
      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  };
  editComments = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, "Comment not found"));
      }
      if (comment.userId !== req.user.userId && !req.user.isAdmin) {
        return next(errorHandler(404, "you can not edit this Comment "));
      }
      const editedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
          content: req.body.content,
        },
        { new: true }
      );
      res.status(201).json(editedComment);
    } catch (error) {
      next(error);
    }
  };
  deleteComments = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, "Comment not found"));
      }
      if (comment.userId !== req.user.userId && !req.user.isAdmin) {
        return next(errorHandler(404, "you can not delete this Comment "));
      }
      await Comment.findByIdAndDelete(req.params.commentId);
      res.status(201).json("Comment has been deleted ");
    } catch (error) {
      next(error);
    }
  };
}
