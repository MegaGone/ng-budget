import { Router } from "express";

// CONTROLLERS
import { createUser, blockUser, getUser, getUsers, updateUser, deleteAll } from "../controllers";

const router = Router();

/**
 * @swagger
 * /user/create
 *      post:
 *          tags:
 *              - user
 *          summary: "Create new user"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      scheme:
 *                          $ref: "#/components/schemas/createUser"
 *          responses:
 *              '200': "User created"
 *              '403': "User already exist"
 *              '400': "Error creating user"
 */
router.post('/user', createUser);
router.get('/users', getUsers);
router.get('/:id', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/all', deleteAll)
router.delete('/delete/:id', blockUser);

export default router;