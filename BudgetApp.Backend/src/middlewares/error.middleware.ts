import { NextFunction, Request, Response } from "express";
import { ResponseStatus } from "src/models";

export const ErrorHandler = (error: ResponseStatus, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500, message } = error;
    res.status(statusCode).send({ statusCode, message });
    next();
};