import { Router } from "express";

import { getCurrencies, getLanguages, saveUserSettings } from "../controllers";

import { validateJWT } from "../middlewares";

const router = Router();

/**
 * @openapi
 * /api/profile/currencies:
 *     get:
 *         tags:
 *             - Settings
 *         summary: "Get all currencies"
 *         parameters:
 *          - name: x-token
 *            in: path
 *            description: JWT to renew session
 *            required: true
 *            schema:
 *              type: string
 *         responses:
 *             '200':
 *                 description: Returns an array of currencies by country
 *             '403':
 *                 description: Token unexpected
 *             '500':
 *                 description:  Internal server error
 */
router.get(
    '/currencies',
    validateJWT,
    getCurrencies
)

/**
 * @openapi
 * /api/profile/languages:
 *     get:
 *         tags:
 *             - Settings
 *         summary: "Get all languages"
 *         parameters:
 *          - name: x-token
 *            in: path
 *            description: JWT to renew session
 *            required: true
 *            schema:
 *              type: string
 *         responses:
 *             '200':
 *                 description: Returns an array of languages by country
 *             '403':
 *                 description: Token unexpected
 *             '500':
 *                 description:  Internal server error
 */
router.get(
    '/languages',
    validateJWT,
    getLanguages
)

router.get(
    '/settings',
    validateJWT,
    saveUserSettings
);

export default router;