import { Router } from "express";
import { createUser } from "src/controllers";

export const userRouter = Router();

userRouter.get(
    "/user/get",
    createUser
);