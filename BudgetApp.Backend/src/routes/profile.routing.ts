import { Router } from "express";
import { getCurrencies, getLanguages } from "src/controllers";

export const profileRouter = Router();

profileRouter.get(
    "/profile/languages",
    getLanguages
);

profileRouter.get(
    "/profile/currencies",
    getCurrencies
)