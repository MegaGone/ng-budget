import { Request, Response, NextFunction } from "express";
import { IUserModel } from "src/database";
import { generateSeed2FA, verify2FA } from "src/helpers";
import { ResponseStatus } from "src/models";
import { BaseService } from "src/services";

export const setup2fa = async (_req: Request, _res: Response, next: NextFunction) => {
    try {

        const { uid } = _req;
        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const user = await userService.getRecord({ id: uid });
        if (!user) throw new ResponseStatus(404, "User not found");

        const seed = await generateSeed2FA(user.email);
        if (!seed) throw new Error("Error to setup 2FA");

        return _res.status(200).json(seed);
    } catch (error) {
        next(error);
    };
};

export const verifyOTP2FA = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { uid } = _req;
        const { code, seed } = _req.body;
        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const user = await userService.getRecord({ id: uid });
        if (!user) throw new ResponseStatus(404, "User not found");

        const isValidOtp = await verify2FA(code, seed);
        if (!isValidOtp) return _res.sendStatus(400);

        return _res.sendStatus(200);
    } catch (error) {
        next(error);
    };
};