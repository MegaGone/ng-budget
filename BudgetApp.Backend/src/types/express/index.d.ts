import express from "express";
import { ROLE_ENUM } from "src/enums";

declare global {
    namespace Express {
        interface Request {
            uid: string;
            role: ROLE_ENUM;
        };
    };
};