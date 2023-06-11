import { Router } from "express";
import { loginWithCredentials, registerUser } from "src/controllers";
import { validateFields } from "src/middlewares";
import { createUserValidationRules } from "src/validators";

export const authRouter = Router();

authRouter.post(
    "/auth/register",
    createUserValidationRules(),
    validateFields,
    registerUser
);

authRouter.post(
    "/auth/login",
    loginWithCredentials
)