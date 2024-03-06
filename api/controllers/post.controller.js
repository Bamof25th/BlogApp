import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export default class PostController {
  createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a post."));
    }
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(403, "Please provide all required feilds."));
    }
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    console.log(req.user);
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.userId,
    });
    try {
      const savedPost = await newPost.save();
      console.log(savedPost);
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  };
  getPosts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order || "asc" ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.catagory && { catagory: req.query.catagory }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

      const totalPosts = await Post.countDocuments();
      const now = new Date();

      const oneMonthsAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );

      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthsAgo },
      });

      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      });
    } catch (error) {
      next(error);
    }
  };
}
