import { Router } from "express";

import { getCurrencies, saveUserSettings } from "../controllers";

const router = Router();

router.get(
    '/countryCurrencies',
    getCurrencies
)

router.get(
    '/settings',
    saveUserSettings
);

export default router;