import { Router } from "express";
import { createTemplate, getTemplate, getTemplates } from "src/controllers";

export const mailRouter = Router();

mailRouter.post(
    "/template/create",
    createTemplate
);

mailRouter.get(
    "/template/:id",
    getTemplate
);

mailRouter.get(
    "/template",
    getTemplates
)