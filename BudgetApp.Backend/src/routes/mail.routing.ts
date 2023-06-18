import { Router } from "express";
import { createTemplate, deleteTemplate, getTemplate, getTemplates, updateTemplate } from "src/controllers";
import { validateFields, validateJWT, validateRoles } from "src/middlewares";
import { createTemplateValidationRules, genericTemplateIdValidationRules, getTemplatesValidationRules, updateTemplateValidationRules } from "src/validators";

export const mailRouter = Router();

mailRouter.post(
    "/template/create",
    createTemplateValidationRules(),
    validateJWT,
    validateRoles(["ADMIN_ROLE"]),
    validateFields,
    createTemplate
);

mailRouter.get(
    "/template/:id",
    genericTemplateIdValidationRules(),
    validateFields,
    getTemplate
);

mailRouter.get(
    "/template",
    getTemplatesValidationRules(),
    validateFields,
    getTemplates
);

mailRouter.put(
    "/template/update",
    updateTemplateValidationRules(),
    validateFields,
    updateTemplate  
);

mailRouter.delete(
    "/template/:id",
    genericTemplateIdValidationRules(),
    validateFields,
    deleteTemplate
);