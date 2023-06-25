import { Router } from "express";
import { setup2fa, verifyOTP2FA } from "src/controllers";

export const userRouter = Router();

userRouter.post(
    "/user/two-factor",
    setup2fa
);

userRouter.post(
    "/user/verify-otp",
    verifyOTP2FA
);