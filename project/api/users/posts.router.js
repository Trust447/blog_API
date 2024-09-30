import { createPost, getPosts, userUpdatePost, deletePost } from "./posts.controller.js";
import { Router } from "express";
import { checkToken } from "../../auth/token_validation.js";

const postRouter = Router(); 

// Create a new post
postRouter.post("/", checkToken, createPost);

// Get all posts
postRouter.get("/", getPosts);

// Update a specific post by ID
postRouter.patch("/:id", checkToken, userUpdatePost);

// Delete a specific post by ID
postRouter.delete("/:id", checkToken, deletePost);

export default postRouter;
