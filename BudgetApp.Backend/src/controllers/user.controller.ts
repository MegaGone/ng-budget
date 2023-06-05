import { Request, Response, NextFunction } from "express";

export const createUser = async (_req: Request, _res: Response, next: NextFunction) => {
    return _res.status(200);
};