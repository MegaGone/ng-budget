import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { SECRETKEY } from "src/config";
import { ResponseStatus } from "src/models";
import { UserPayload } from "src/interfaces";

export const validateJWT = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const token: any = _req.header("x-token");
        if (!token) throw new ResponseStatus(401, "Token unexpected.");

        try 
        {
            const { uid } = verify(token, SECRETKEY) as UserPayload;
            _req.uid = uid;

        } catch {
            throw new ResponseStatus(400, "Token not valid.")
        }

        next();
    } catch (error) {
        next(error);
    };
};