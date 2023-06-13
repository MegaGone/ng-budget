import { Router } from "express";
import { createTemplate } from "src/controllers";

export const mailRouter = Router();

mailRouter.post(
    "/template/create",
    createTemplate
);