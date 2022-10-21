import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";
import { IField } from "../interfaces";
import { ResponseStatus } from "../models";

export const validateFields = async (_req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(_req);

    const fields: IField[] = await errors.array().map((error: any) => {
        return {
            param   : error.param,
            msg     : error.msg
        }
    });

    return (!errors.isEmpty()) ? res.status(400).json(new ResponseStatus(400, "Empty fields", fields)) : next();
}