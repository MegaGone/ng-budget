import { Router } from "express";

// CONTROLLERS
import { createUser, blockUser, getUser, getUsers, updateUser, deleteAll } from "../controllers";

const router = Router();

/**
 *  CREATE USER
 *  @openapi
 *  /user/user:
 *      post:
 *          tags:
 *              - users
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
 router.post('/user', createUser);

router.get('/users', getUsers);
router.get('/:id', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/all', deleteAll);
router.delete('/delete/:id', blockUser);

export default router;