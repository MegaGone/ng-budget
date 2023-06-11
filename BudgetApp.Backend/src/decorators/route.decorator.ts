import { NextFunction, Request, RequestHandler, Response } from "express";
import { validateJWT } from "src/middlewares";

export const protectedRoute = (): RequestHandler => {
    return function (req: Request, res: Response, next: NextFunction) {
        validateJWT(req, res, next);
    };
};