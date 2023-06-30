import { Router } from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "src/controllers";
import { protectAdminRoute, validateFields } from "src/middlewares";
import { getUserValidationRules, getUsersValidationRules } from "src/validators";

export const userRouter = Router();

userRouter.get(
    "/user/users",
    getUsersValidationRules(),
    protectAdminRoute(),
    validateFields,
    getUsers
);

userRouter.get(
    "/user/:id",
    getUserValidationRules(),
    protectAdminRoute(),
    validateFields,
    getUserById
);

userRouter.put(
    "/user/update/:id",
    getUserValidationRules(),
    protectAdminRoute(),
    validateFields,
    updateUser
);

userRouter.delete(
    "/user/delete/:id",
    getUserValidationRules(),
    protectAdminRoute(),
    validateFields,
    deleteUser
);