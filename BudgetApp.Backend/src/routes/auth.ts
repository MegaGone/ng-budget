import { Router } from "express";

// CONTROLLERS
import { getSession, loginWithCredentials, loginWithGoogle, register, renewToken } from "../controllers";

// MIDDLEWARES
import { validateFields, validateJWT } from "../middlewares";
import { registerUserValidationRules, loginValidatonRules } from "../validators";

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
 *          '403':
 *              description: You are blocked
 *          '500':
 *              description: Something has gone wrong, try again later
 *          '200':
 *              description: Returns JWT & User info
 */
router.post(
    '/login',
    loginValidatonRules(),
    validateFields,
    loginWithCredentials
);

/**
 *  @openapi
 *  /api/auth/register:
 *      post:
 *          tags:
 *              - Auth
 *          summary: "Register new user"
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
router.post(
    '/register',
    registerUserValidationRules(),
    validateFields,
    register
);

router.post('/google', loginWithGoogle);

/**
 * @openapi
 * /api/auth/session:
 *    get:
 *      tags:
 *        - Auth
 *      summary: "Get user session"
 *      parameters:
 *      - name: x-token
 *        in: path
 *        description: JWT to get session
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '404':
 *          description: User not found
 *        '500':
 *          description: Error getting session
 *        '200':
 *          description: User
 *        '400':
 *          description: Token unexpected
 */
router.get('/session', getSession);

/**
 * @openapi
 * /api/auth/renew:
 *    get:
 *      tags:
 *        - Auth
 *      summary: "Renew token"
 *      parameters:
 *      - name: x-token
 *        in: path
 *        description: JWT to renew session
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '403':
 *          description: Token unexpected
 *        '404':
 *          description: User not found
 *        '400':
 *          description: Error to renew token
 *        '200':
 *          description: New token
 */
router.get('/renew',
    [
        validateJWT,
        validateFields
    ], renewToken);

export default router;