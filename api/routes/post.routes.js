import express from "express";
import { verifyToken } from './../utils/verifyUser.js';
import PostController from "../controllers/post.controller.js";


const postRouter = express.Router();

const  postController = new PostController();

postRouter.post('/create', verifyToken , postController.createPost)
postRouter.get('/getposts',  postController.getPosts)


export default postRouter