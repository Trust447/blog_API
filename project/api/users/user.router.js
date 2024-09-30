import { createUser, getAllUsers, getUserByUserId, userUpdate, deleteUserById, login } from "./user.controller.js";
import { Router } from "express";
import { checkToken } from "../../auth/token_validation.js";

const userRouter = Router();

// Define routes
userRouter.post("/login", login);
userRouter.post("/", createUser);

// Use userRouter for the following routes
userRouter.get("/", checkToken, getAllUsers);
userRouter.get("/:id", checkToken, getUserByUserId);
userRouter.patch("/:id", checkToken, userUpdate);
userRouter.delete("/:id", checkToken, deleteUserById);  

// Export the router
export default userRouter;
