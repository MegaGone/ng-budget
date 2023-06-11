import { Router } from "express";
import { createUser } from "src/controllers";
import { protectedRoute } from "src/decorators";

export const userRouter = Router();

userRouter.get(
    "/user/get",
    protectedRoute(),
    createUser
);