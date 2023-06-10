import { Request, Response, NextFunction } from "express";
import { hashSync, genSaltSync, compareSync } from "bcrypt";

import { IUserModel, UserModel } from "src/database";
import { BaseService } from "src/services";
import { IUser } from "src/interfaces";

export const registerUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const salt = genSaltSync();
        const user = <IUser>_req.body;
        user.enabled = true;
        user.google = false;
        user.password = hashSync(user.password, salt);

        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const id = await userService.insertRecord(user);

        if (!id) throw new Error("Error to insert user");

        return _res.status(200).json({ id });
    } catch (error: any) {
        throw new Error(error);
    }
};