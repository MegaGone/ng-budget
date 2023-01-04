import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRETKEY, TOKEN } from "../config";

import { IHeaderValidators, IJwt } from "../interfaces";

// CONFIG
import { ResponseStatus } from "../models";
import { PARAM_LOCATION } from "../typings";

export const validateJWT = async (_req: Request, res: Response, next: NextFunction) => {

    const token = _req.header("x-token");

    if (!token) {
        const message: IHeaderValidators = {
            errors: [
                {
                    field: TOKEN,
                    message: {
                        location: PARAM_LOCATION.HEADER,
                        warnings: "Token unexpected."
                    }
                }
            ]
        };

        return res.status(403).send(message);
    }

    try {
        const { uid } = jwt.verify(token, SECRETKEY) as IJwt;

        _req.uid = uid;

        return next();

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error validating token."));
    }
};