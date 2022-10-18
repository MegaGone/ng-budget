import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { IJwt } from "../interfaces";
import { ResponseStatus, User } from "../models";

export const validateJWT = async (_req: Request, res: Response, next: NextFunction) => {

    const token = _req.header("x-token");

    if (!token) return res.status(403).json(new ResponseStatus(403, "Token unexpected"));

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY!) as IJwt;

        const userDB = await User.findById(uid);

        if (!userDB) return res.status(404).json(new ResponseStatus(404, "User not found"));

        _req.user = userDB;

        return next();

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error to renew token"));
    }
};