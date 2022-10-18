import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseStatus } from "../models";

export const validateFields = async (_req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(_req);

    console.log(errors);
    
    return (!errors.isEmpty()) ? res.status(400).json(new ResponseStatus(400, "Fields empty")) : next();
}