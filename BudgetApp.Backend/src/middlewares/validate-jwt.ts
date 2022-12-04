import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRETKEY } from "../config";

import { IJwt } from "../interfaces";
import { ResponseStatus } from "../models";

export const validateJWT = async (_req: Request, res: Response, next: NextFunction) => {

    const token = _req.header("x-token");

    if (!token) return res.status(403).json(new ResponseStatus(403, "Token unexpected"));

    try {
        const { uid } = jwt.verify(token, SECRETKEY) as IJwt;

        _req.uid = uid;

        return next();

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error to renew token"));
    }
};