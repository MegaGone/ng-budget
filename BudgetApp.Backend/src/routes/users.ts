import { Router } from "express";
import { check } from "express-validator";

// CONTROLLERS
import { blockUser, getUser, getUsers, updateUser, deleteAll } from "../controllers";
import { validateFields, validateJWT } from "../middlewares";

// VALIDATORS RULES
import { genericMongoIdValidationRules } from "../validators";

const router = Router();

 /**
  * @openapi
  * /api/user/users:
  *     get:
  *         tags:
  *             - Users
  *         summary: "Get all users"
  *         parameters: 
  *             -   in: query
  *                 name: page
  *                 type: number
  *                 description: Number of page
  *                 default: 1
  *             -   in: query
  *                 name: limit
  *                 type: number
  *                 description: Items per page
  *                 default: 5
  *         responses:
  *             '201':
  *                 description: No users to show
  *             '200':
  *                 description: All users
  *             '400':
  *                 description: Error getting users
  */
router.get('/users', 
[
  validateJWT,
  validateFields
], getUsers);

/**
 * @openapi
 * /api/user/{id}:
 *    get:
 *      tags:
 *        - Users
 *      summary: "Get user by ID"
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID User to get
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '404':
 *          description: User not found
 *        '400':
 *          description: Error getting user
 *        '200':
 *          description: User
 */
router.get(
  '/:id', 
  validateJWT,
  check('id', 'ID not valid').isMongoId(),
  validateFields, 
  getUser
);

/**
 * @openapi
 * /api/user/{id}:
 *    put:
 *      tags:
 *        - Users
 *      summary: "Update user by ID"
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID user to update
 *          required: true
 *          schema:
 *            type: string
 *      responses:
  *        '404':
 *          description: User not found
 *        '400':
 *          description: Error getting user
 *        '200':
 *          description: User updated
 */
router.put(
  '/update/:id', 
  validateJWT,
  genericMongoIdValidationRules(),
  validateFields, 
  updateUser
);

/**
 *  @openapi
 *  /api/user/delete/all:
 *      delete:
 *          tags:
 *              - Users
 *          summary: "Delete all blocked users"
 *          responses:
 *              '201':
 *                  description: Nothing to clear
 *              '200':
 *                  description: Users deleted
 *              '500':
 *                  description: Cannot delete all the users
 *              '400':
 *                  description: Error deleting users
 */
router.delete('/delete/all', 
[
  validateJWT,
  validateFields
], deleteAll);

/**
 * @openapi
 * /api/user/delete/{id}:
 *    delete:
 *      tags:
 *        - Users
 *      summary: "Block user by ID"
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID User to block
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '404':
 *          description: User not found
 *        '400':
 *          description: User already blocked
 *        '500':
 *          description: Error getting user
 *        '200':
 *          description: User blocked
 */
router.delete('/delete/:id',
  validateJWT,
  genericMongoIdValidationRules(),
  validateFields, 
  blockUser
);

// TODO: VALIDATE ROLES TO PURGE USERS

export default router;