import { Response, NextFunction, Request } from "express";
import { ResponseStatus } from "src/models";

export const validateRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            
            if (!req.uid) throw new Error("Error unexpected 5");

            if (!roles.includes(req.role)) throw new ResponseStatus(403, "Unauthorized.");

        } catch (error) {
            next(error);  
        };

    };
};