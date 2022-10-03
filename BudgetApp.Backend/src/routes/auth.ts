import { Router } from "express";

// CONTROLLERS
import { getSession, loginWithCredentials, loginWithGoogle, register } from "../controllers";

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *          - Auth
 *      summary: "Sign In"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: ["email", "password"]
 *                      properties: {
 *                          email   : { type: "string" },
 *                          password: { type: "string"}
 *                      }
 *      responses:
 *          '204':
 *              description: User not found
 *          '400':
 *              description: Credentials not valid
 *          '401':
 *              description: You are blocked
 *          '500':
 *              description: Something has gone wrong, try again later
 *          '200':
 *              description: Returns JWT & User info
 */
router.post('/login',       loginWithCredentials);

/**
 *  @openapi
 *  /api/auth/register:
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
router.post('/register',    register);
router.post('/google',      loginWithGoogle);
router.post('/session',     getSession);

export default router;