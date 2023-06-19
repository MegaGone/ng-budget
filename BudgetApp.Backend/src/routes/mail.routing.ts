import { Router } from "express";
import { createTemplate, deleteTemplate, getTemplate, getTemplates, updateTemplate } from "src/controllers";
import { protectAdminRoute, validateFields } from "src/middlewares";
import { createTemplateValidationRules, genericTemplateIdValidationRules, getTemplatesValidationRules, updateTemplateValidationRules } from "src/validators";

export const mailRouter = Router();

mailRouter.post(
    "/template/create",
    createTemplateValidationRules(),
    protectAdminRoute(),
    validateFields,
    createTemplate
);

mailRouter.get(
    "/template/:id",
    genericTemplateIdValidationRules(),
    protectAdminRoute(),
    validateFields,
    getTemplate
);

mailRouter.get(
    "/template",
    getTemplatesValidationRules(),
    protectAdminRoute(),
    validateFields,
    getTemplates
);

mailRouter.put(
    "/template/update",
    updateTemplateValidationRules(),
    protectAdminRoute(),
    validateFields,
    updateTemplate  
);

mailRouter.delete(
    "/template/:id",
    genericTemplateIdValidationRules(),
    protectAdminRoute(),
    validateFields,
    deleteTemplate
);