import { createUser, getAllUsers, getUserByUserId, userUpdate, deleteUserById, login } from "./user.controller.js";
import { Router } from "express";
import { checkToken } from "../../auth/token_validation.js";




const userRouter = Router(); 
userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", checkToken, getUserByUserId);
userRouter.patch("/:id", checkToken, userUpdate);
userRouter.delete("/:id", checkToken, deleteUserById);
userRouter.post("/login", login);

export default userRouter;
