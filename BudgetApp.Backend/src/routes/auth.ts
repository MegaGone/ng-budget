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
router.post('/register',    register);
router.post('/google',      loginWithGoogle);
router.post('/session',     getSession);

export default router;