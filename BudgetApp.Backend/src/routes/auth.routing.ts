import { Router } from "express";
import { activateUser, forgotPassword, loginWithCredentials, registerUser, verifyOTP } from "src/controllers";
import { validateFields } from "src/middlewares";
import { registerUserValidationRules, loginWithCredentialsValidationRules, verifyOtpValidationRules, activateUserValidationRules, forgotPasswordValidationRules } from "src/validators";

export const authRouter = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Sign in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - name
 *                - lastName
 *                - displayName
 *                - password
 *              properties:
 *               email:
 *                   type: string
 *                   description: User email
 *                   example: john.smith@example.com
 *               name:
 *                   type: string
 *                   description: User first name
 *                   example: Jhon
 *               lastName:
 *                   type: string
 *                   description: User last name
 *                   example: Smith
 *               displayName:
 *                   type: string
 *                   description: User display name
 *                   example: Jhon Smith
 *               password:
 *                   type: string
 *                   description: User password
 *                   example: 87G!8g3xrF3Hif@H!5&Xx$QkbT8
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               id: 6483e4fc8e5ec2f024931c52
 *               statusCode: 200
 *       400:
 *         description: Email already exists
 *       422:
 *         description: Fields Error 
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"email","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or must be greater than 0."}}]}
 *       500:
 *         description: Error to create user. 
 */
authRouter.post(
    "/auth/register",
    registerUserValidationRules(),
    validateFields,
    registerUser
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login using credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *               email:
 *                   type: string
 *                   description: User email
 *                   example: john.smith@example.com
 *               password:
 *                   type: string
 *                   description: User password
 *                   example: 87G!8g3xrF3Hif@H!5&Xx$QkbT8
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *               statusCode: 200
 *       401:
 *          description: Email or password incorrect
 *       403:
 *          description: User blocked
 *       404:
 *         description: User not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"email","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or must be greater than 0."}}]}
 *       500:
 *         description: Error to validate credentials.
 */
authRouter.post(
    "/auth/login",
    loginWithCredentialsValidationRules(),
    validateFields,
    loginWithCredentials
);

authRouter.post(
    "/auth/forgot-password",
    forgotPasswordValidationRules(),
    validateFields,
    forgotPassword
);

authRouter.get(
    "/auth/:code",
    verifyOtpValidationRules(),
    validateFields,
    verifyOTP
);

authRouter.post(
    "/auth/activate",
    activateUserValidationRules(),
    validateFields,
    activateUser
);