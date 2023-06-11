import { Request, Response, NextFunction } from "express";
import { hashSync, genSaltSync, compareSync } from "bcrypt";

import { IUserModel, UserModel } from "src/database";
import { BaseService } from "src/services";
import { IUser } from "src/interfaces";
import { ResponseStatus } from "src/models";
import { generateJWT } from "src/helpers";

export const registerUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const user = <IUser>_req.body;

        const emailExists = await userService.getRecord(user.email);
        if (emailExists) throw new ResponseStatus(400, "Email already exists");

        const salt = genSaltSync();
        user.enabled = true;
        user.google = false;
        user.password = hashSync(user.password, salt);

        const id = await userService.insertRecord(user);

        if (!id) throw new Error("Error to insert user");

        return _res.status(200).json({ statusCode: 200, id });
    } catch (error) {
        next(error);
    };
};

export const loginWithCredentials = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { email, password } = _req.body;

        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const user = await userService.getRecord(email);

        if (!user) throw new ResponseStatus(404, "User not found");

        if (!user.enabled) throw new ResponseStatus(403, "User blocked, talk with the administrator");

        const isValidPassword = compareSync(password, user.password);
        if (!isValidPassword) throw new ResponseStatus(401, "Email/Password incorrect.")

        const token = await generateJWT(user.uid!);
        if (!token) throw new Error("Error to generate JWT.");

        return _res.status(200).json({ statusCode: 200, token, user });
    } catch (error) {
        next(error);
    };
};