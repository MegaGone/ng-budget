import { Router } from "express";
import { getCurrencies, getLanguages } from "src/controllers";
import { validateFields, validateJWT } from "src/middlewares";

export const profileRouter = Router();

/**
 * @swagger
 * /api/profile/languages:
 *   get:
 *     summary: Get languges avaliables
 *     tags: [Profile]
 *     security:
 *       - x-token: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  responseStatus:
 *                     type: integer
 *                     example: 200
 *                  languages:
 *                     type: array
 *                     items:
 *                      $ref: '#/components/schemas/LanguagesSchema'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error to get languages
 */
profileRouter.get(
    "/profile/languages",
    validateJWT,
    validateFields,
    getLanguages
);

/**
 * @swagger
 * /api/profile/currencies:
 *   get:
 *     summary: Get currencies avaliables
 *     tags: [Profile]
 *     security:
 *       - x-token: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  responseStatus:
 *                     type: integer
 *                     example: 200
 *                  currencies:
 *                     type: array
 *                     items:
 *                      $ref: '#/components/schemas/CurrencySchema'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error to get languages
 */
profileRouter.get(
    "/profile/currencies",
    validateJWT,
    validateFields,
    getCurrencies
);