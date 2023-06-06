import { Request, Response, NextFunction } from "express";
import { UserService } from "src/services";

export const createUser = async (_req: Request, _res: Response, next: NextFunction) => {

    const userService: UserService = _req.app.locals.service.userService;
    // const user = await userService.insert(})

    return _res.status(200).send("OK")
};