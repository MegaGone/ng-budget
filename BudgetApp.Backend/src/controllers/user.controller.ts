import { Request, Response, NextFunction } from "express";
import { IUserModel, UserModel } from "src/database";

export const createUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {

        const { name, lastName, displayName, password, avatar, email, role } = _req.body;

        const user: IUserModel = new UserModel({
            name,
            lastName,
            displayName,
            email,
            password,
            avatar
        });

        const inserted = await user.save();

        return _res.status(200).json({inserted});
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};