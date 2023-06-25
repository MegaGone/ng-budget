import { Router } from "express";
import { createTemplate, deleteTemplate, getTemplate, getTemplates, updateTemplate } from "src/controllers";
import { protectAdminRoute, validateFields } from "src/middlewares";
import { createTemplateValidationRules, genericTemplateIdValidationRules, getTemplatesValidationRules, updateTemplateValidationRules } from "src/validators";

export const mailRouter = Router();

/**
 * @swagger
 * /api/template/create:
 *   post:
 *     summary: Create template
 *     tags: [Template]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - subject
 *                - from
 *                - template
 *                - fields
 *              properties:
 *               subject:
 *                   type: string
 *                   description: Subject email
 *                   example: Forgot password
 *               from:
 *                   type: string
 *                   description: Sender description
 *                   example: noreply@ngbudget.com
 *               template:
 *                   type: string
 *                   description: Template in HTML
 *                   example: <h1>Hello world</h1>
 *               fields:
 *                   type: array
 *                   description: Template fields
 *                   example: ["name","url"]
 *                   items:
 *                      type: string
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               id: d330e9770d31a46b
 *               statusCode: 200
 *       400:
 *         description: Another template exists with the same subject
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 *       500:
 *         description: Error to create user. 
 */
mailRouter.post(
    "/template/create",
    createTemplateValidationRules(),
    protectAdminRoute(),
    validateFields,
    createTemplate
);

/**
 * @swagger
 * /api/template/{id}:
 *   get:
 *     summary: Get template by ID
 *     tags: [Template]
 *     security:
 *      - x-token: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     param:
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               template:
 *                  from: noreply@ngbudget.com <megagone.dev@gmail.com>
 *                  subject: Forgot password
 *                  fields: ["name", "url"]
 *                  template: <h1>Hi __name__ check this <a href=__url__>link</a></h1>
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *          description: Template not found
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 */
mailRouter.get(
    "/template/:id",
    genericTemplateIdValidationRules(),
    protectAdminRoute(),
    validateFields,
    getTemplate
);

/**
 * @swagger
 * /api/template:
 *   get:
 *     summary: Get templates paginated
 *     tags: [Template]
 *     security:
 *       - x-token: []
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of templates to return per page
 *         example: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseStatus:
 *                   type: integer
 *                   example: 200
 *                 templates:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TemplateSchema'
 *                 count:
 *                   type: integer
 *                   example: 20
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 2
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         description: Error to get templates
 *         content:
 *           application/json:
 *             example:
 *               error: "Error to get templates"
 */
mailRouter.get(
    "/template",
    getTemplatesValidationRules(),
    protectAdminRoute(),
    validateFields,
    getTemplates
);

/**
 * @swagger
 * /api/template/update:
 *   put:
 *     summary: Update template
 *     tags: [Template]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - subject
 *                - from
 *                - template
 *                - fields
 *              properties:
 *               subject:
 *                   type: string
 *                   description: Subject email
 *                   example: Forgot password
 *               from:
 *                   type: string
 *                   description: Sender description
 *                   example: noreply@ngbudget.com
 *               template:
 *                   type: string
 *                   description: Template in HTML
 *                   example: <h1>Hello world</h1>
 *               fields:
 *                   type: array
 *                   description: Template fields
 *                   example: ["name","url"]
 *                   items:
 *                      type: string
 *     param:
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *          description: Template not found
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 *       500:
 *         description: Error to update template
 */
mailRouter.put(
    "/template/update",
    updateTemplateValidationRules(),
    protectAdminRoute(),
    validateFields,
    updateTemplate  
);

/**
 * @swagger
 * /api/template/{id}:
 *   delete:
 *     summary: Delete template by ID
 *     tags: [Template]
 *     security:
 *      - x-token: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     param:
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *          description: Template not found
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 *       500:
 *         description: Error to delete template
 */
mailRouter.delete(
    "/template/:id",
    genericTemplateIdValidationRules(),
    protectAdminRoute(),
    validateFields,
    deleteTemplate
);