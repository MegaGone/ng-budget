import { Router } from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "src/controllers";
import { protectAdminRoute, validateFields } from "src/middlewares";
import { getUserValidationRules, getUsersValidationRules } from "src/validators";

export const userRouter = Router();

/**
 * @swagger
 * /api/users?page=1&pageSize=10:
 *   get:
 *     summary: Get users paginated
 *     tags: [User]
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
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserSchema'
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
 *         description: Error to get users
 *         content:
 *           application/json:
 *             example:
 *               error: "Error to get users"
 */
userRouter.get(
    "/user/users",
    getUsersValidationRules(),
    protectAdminRoute(),
    validateFields,
    getUsers
);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     security:
 *       - x-token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  responseStatus:
 *                     type: integer
 *                     example: 200
 *                  user:
 *                     type: object
 *                     $ref: '#/components/schemas/UserSchema'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: User not found
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 */
userRouter.get(
    "/user/:id",
    getUserValidationRules(),
    protectAdminRoute(),
    validateFields,
    getUserById
);

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     security:
 *      - x-token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - lastName
 *                - displayName
 *                - avatar
 *                - role
 *              properties:
 *               name:
 *                   type: string
 *                   description: Username
 *                   example: Jhon
 *               lastName:
 *                   type: string
 *                   description: Last Name
 *                   example: Doe
 *               displayName:
 *                   type: string
 *                   description: Displayname on console
 *                   example: Monopoly
 *               avatar:
 *                   type: string
 *                   description: User avatar un base64
 *                   example: base64....
 *               role:
 *                   type: string
 *                   description: User role
 *                   example: USER_ROLE
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
 *          description: User not found
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 *       500:
 *         description: Error to update user
 */
userRouter.put(
    "/user/update/:id",
    getUserValidationRules(),
    protectAdminRoute(),
    validateFields,
    updateUser
);

/**
 * @swagger
 * /api/user/delete{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     security:
 *       - x-token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *              responseStatus: 200
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: User not found
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 *       500:
 *         description: Error to delete user
 */
userRouter.delete(
    "/user/delete/:id",
    getUserValidationRules(),
    protectAdminRoute(),
    validateFields,
    deleteUser
);