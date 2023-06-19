import { Request, Response, NextFunction } from "express";
import { hashSync, genSaltSync, compareSync } from "bcrypt";

import { IEmailModel, IUserModel, UserModel } from "src/database";
import { BaseService } from "src/services";
import { IUser } from "src/interfaces";
import { ResponseStatus } from "src/models";
import { generateJWT } from "src/helpers";
import { FORGOT_PASSWORD_TEMPLATE_ID } from "src/config";
import { Mailer } from "src/clients";

export const registerUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const user = <IUser>_req.body;

        const emailExists = await userService.getRecord({ email: user.email });
        if (emailExists) throw new ResponseStatus(400, "Email already exists");

        const salt = genSaltSync();
        user.enabled = true;
        user.google = false;
        user.password = hashSync(user.password, salt);

        const id = await userService.insertRecord(user);

        if (!id) throw new Error("Error to create user");

        return _res.status(200).json({ statusCode: 200, id });
    } catch (error) {
        next(error);
    };
};

export const loginWithCredentials = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { email, password } = _req.body;

        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const user = await userService.getRecord({ email });

        if (!user) throw new ResponseStatus(404, "User not found");

        if (!user.enabled) throw new ResponseStatus(403, "User blocked, talk with the administrator");

        const isValidPassword = compareSync(password, user.password);
        if (!isValidPassword) throw new ResponseStatus(401, "Email/Password incorrect.")

        const token = await generateJWT(user.id!, user.role);
        if (!token) throw new Error("Error to validate credentials.");

        return _res.status(200).json({ statusCode: 200, token, user });
    } catch (error) {
        next(error);
    };
};

export const forgotPassword = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { email } = _req.body;      

        const emailService: BaseService<IEmailModel> = _req.app.locals.mailService;
        const mailerService: Mailer = _req.app.locals.mailerService;
        
        const template = await emailService.getRecord({ identificator: FORGOT_PASSWORD_TEMPLATE_ID });

        if (!template) throw new ResponseStatus(404, "Template not found");

        const sended = await mailerService.sendMail(
            template.from,
            template.subject,
            email,
            ""
        );   

        if (!sended) throw new Error("Error to send email");

        return _res.status(200).json({ statusCode: 200, sended });
    } catch (error) {
        next(error);
    };
};