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
 */
router.post('/login',       loginWithCredentials);
router.post('/register',    register);
router.post('/google',      loginWithGoogle);
router.post('/session',     getSession);

export default router;