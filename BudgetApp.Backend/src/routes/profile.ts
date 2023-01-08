import { Router } from "express";

import { getCurrencies, getLanguages, saveUserSettings } from "../controllers";

const router = Router();

router.get(
    '/currencies',
    getCurrencies
)

router.get(
    '/languages',
    getLanguages
)

router.get(
    '/settings',
    saveUserSettings
);

export default router;