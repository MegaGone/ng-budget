import { Router } from "express";

// CONTROLLERS
import { createUser, blockUser, getUser, getUsers, updateUser, deleteAll } from "../controllers";

const router = Router();

/**
 *  CREATE USER
 *  @openapi
 *  /api/user/create:
 *      post:
 *          tags:
 *              - Users
 *          summary: "Create user"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/createUser"
 *          responses:
 *              '200':
 *                  description: User created
 *              '403':
 *                  description: User already exists
 *              '400':
 *                  description: Error creating user
 */
 router.post('/create', createUser);

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
router.get('/users', getUsers);

router.get('/:id', getUser);

router.put('/update/:id', updateUser);

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
router.delete('/delete/all', deleteAll);

router.delete('/delete/:id', blockUser);

export default router;