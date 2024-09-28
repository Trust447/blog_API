import { createPost, getPosts, userUpdatePost, deletePost } from "./posts.controller.js";
import { Router } from "express";
import { checkToken } from "../../auth/token_validation.js";


const postRouter = Router(); 

postRouter.post("/", createPost);
postRouter.get("/", getPosts);
postRouter.patch("/", userUpdatePost);
postRouter.delete("/", checkToken, deletePost);

export default postRouter;


