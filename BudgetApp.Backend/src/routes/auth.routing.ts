import { Router } from "express";
import { activateUser, forgotPassword, loginWithCredentials, registerUser, setup2fa, verify2fa, verifyOTP } from "src/controllers";
import { validateFields } from "src/middlewares";
import {
    registerUserValidationRules,
    loginWithCredentialsValidationRules,
    verifyOtpValidationRules,
    activateUserValidationRules,
    forgotPasswordValidationRules,
    setup2faValidationRules,
    verify2faValidationRules
} from "src/validators";

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
 *               uid: 6483e4fc8e5ec2f024931c52
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

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *               email:
 *                   type: string
 *                   description: User email
 *                   example: client@ngbudget.com
 *     responses:
 *       200:
 *         description: Petición de recuperación de contraseña exitosa
 *       400:
 *         description: Error to generate otp
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
 *         description: Error to send email
 */
authRouter.post(
    "/auth/forgot-password",
    forgotPasswordValidationRules(),
    validateFields,
    forgotPassword
);

/**
 * @swagger
 * /api/auth/{code}:
 *   get:
 *     summary: Validate otp
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Otp code
 *     responses:
 *       200:
 *         description: Otp valid
 *       400:
 *         description: Otp has expired
 *       404:
 *         description: Otp not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"code","message":{"locaction":"param","warnings":"The field does not exist, is not a string or must be greater than 0."}}]}
 *       500:
 *         description: Error to verify otp
 */
authRouter.get(
    "/auth/:code",
    verifyOtpValidationRules(),
    validateFields,
    verifyOTP
);

/**
 * @swagger
 * /api/auth/activate-user:
 *   post:
 *     summary: Activate user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - code
 *                - password
 *              properties:
 *               code:
 *                   type: string
 *                   description: Otp code
 *                   example: 9865381
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
 *               message: User activated
 *               statusCode: 200
 *       400:
 *          description: Error to validate otp
 *       404:
 *         description: Otp not found
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
 *         description: Error to activate user
 */
authRouter.post(
    "/auth/activate-user",
    activateUserValidationRules(),
    validateFields,
    activateUser
);

/**
 * @swagger
 * /api/auth/setup-2fa:
 *   post:
 *     summary: Set up two factor authentication
 *     tags: [Auth]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - code
 *                - seed
 *                - uid
 *              properties:
 *               code:
 *                   type: string
 *                   description: Otp code
 *                   example: 986538
 *               uid:
 *                   type: string
 *                   description: User ID
 *                   example: 6498d52fd0bf7511f8ab0995
 *               seed:
 *                   type: string
 *                   description: Seed in base32
 *                   example: IFQUKYJMEZ5EEVZTGZJEON35F42QWERTYUIOXCV
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzhjMGIyMzU5YWIxMjUxOGQ0YWEyZjYiLCJpYXQiOjE2NzIyODE2NzMsImV4cCI6MTY3MjI5NjA3M30.CUGDO4WL5FB35I4HVb2jhyUiuB1Nr79X9tALqh0u5PI
 *               statusCode: 200
 *       400:
 *         description: OTP not valid
 *       403:
 *         description: 2FA already configured.
 *       404:
 *         description: User not found
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 *       500:
 *         description: Error unexpected
 */
authRouter.post(
    "/auth/setup-2fa",
    setup2faValidationRules(),
    validateFields,
    setup2fa
);

/**
 * @swagger
 * /api/auth/verify-2fa:
 *   post:
 *     summary: Verify otp two factor authentication
 *     tags: [Auth]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - code
 *                - uid
 *              properties:
 *               code:
 *                   type: string
 *                   description: Otp code
 *                   example: 986538
 *               uid:
 *                   type: string
 *                   description: User ID
 *                   example: 6498d52fd0bf7511f8ab0995
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzhjMGIyMzU5YWIxMjUxOGQ0YWEyZjYiLCJpYXQiOjE2NzIyODE2NzMsImV4cCI6MTY3MjI5NjA3M30.CUGDO4WL5FB35I4HVb2jhyUiuB1Nr79X9tALqh0u5PI
 *               statusCode: 200
 *       400:
 *         description: OTP not valid
 *       403:
 *         description: 2FA already configured.
 *       404:
 *         description: User not found
 *       422:
 *         $ref: '#/components/responses/FieldsError'
 *       500:
 *         description: Error unexpected
 */
authRouter.post(
    "/auth/verify-2fa",
    verify2faValidationRules(),
    validateFields,
    verify2fa
);