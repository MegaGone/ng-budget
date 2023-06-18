import { Router } from "express";
import { createTemplate, deleteTemplate, getTemplate, getTemplates, updateTemplate } from "src/controllers";

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
);

mailRouter.put(
    "/template/update",
    updateTemplate  
);

mailRouter.delete(
    "/template/:id",
    deleteTemplate
);