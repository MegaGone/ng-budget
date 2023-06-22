import { Request, Response, NextFunction } from "express";
import { hashSync, genSaltSync, compareSync } from "bcrypt";

import { IOtpModel, ITemplateModel, IUserModel, UserModel } from "src/database";
import { BaseService } from "src/services";
import { IUser } from "src/interfaces";
import { ResponseStatus } from "src/models";
import { convertTemplate, generateJWT, generateOTP } from "src/helpers";
import { ACTIVATE_USER_TEMPLATE_ID, BASE_URL, FORGOT_PASSWORD_TEMPLATE_ID } from "src/config";
import { Mailer } from "src/clients";

export const registerUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const user = <IUser>_req.body;

        // SERVICES
        const templateService: BaseService<ITemplateModel> = _req.app.locals.mailService;
        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const otpService: BaseService<IOtpModel> = _req.app.locals.otpService;
        const mailerService: Mailer = _req.app.locals.mailer;

        // EMAIL VALIDATION
        const emailExists = await userService.getRecord({ email: user.email });
        if (emailExists) throw new ResponseStatus(400, "Email already exists");

        // const salt = genSaltSync();
        user.enabled = false;
        user.google = false;
        // user.password = hashSync(user.password, salt);

        // TEMPLATE
        const template = await templateService.getRecord({ identificator: ACTIVATE_USER_TEMPLATE_ID });
        if (!template) throw new ResponseStatus(404, "Template not found");

        // OTP VALIDATION
        const otp = generateOTP();
        const otpDB = await otpService.insertRecord({ user: user.email, code: parseInt(otp) });
        if (!otpDB) throw new ResponseStatus(400, "Error to generate otp");

        const fields = {
            NAME: user.displayName,
            URL: `${BASE_URL}auth/activate-user?${otp}`
        };

        // GET TEMPLATE TO SEND
        const fullTemplate = await convertTemplate(template.template, fields, template.fields);
        if (!fullTemplate) throw new ResponseStatus(400, "Error to reset password.");

        const sended = await mailerService.sendMail(
            template.from,
            template.subject,
            user.email,
            fullTemplate
        );
        if (!sended) throw new Error("Error to send email");

        // FINALLY INSERT USER
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

        const templateService: BaseService<ITemplateModel> = _req.app.locals.mailService;
        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const otpService: BaseService<IOtpModel> = _req.app.locals.otpService;
        const mailerService: Mailer = _req.app.locals.mailer;

        const template = await templateService.getRecord({ identificator: FORGOT_PASSWORD_TEMPLATE_ID });
        if (!template) throw new ResponseStatus(404, "Template not found");

        const user = await userService.getRecord({ email }, ["displayName", "enabled", "email"]);
        if (!user) throw new ResponseStatus(404, "User not found");
        if (!user.enabled) throw new ResponseStatus(403, "User blocked, talk with the administrator");

        const otp = generateOTP();
        const otpDB = await otpService.insertRecord({ user: user.email, code: parseInt(otp) });
        if (!otpDB) throw new ResponseStatus(400, "Error to generate otp");

        const fields = {
            NAME: user.displayName,
            URL: `${BASE_URL}auth/restore-password?${otp}}`,
            TIME: '1 hora',
        };

        const fullTemplate = await convertTemplate(template.template, fields, template.fields);
        if (!fullTemplate) throw new ResponseStatus(400, "Error to reset password.");

        const sended = await mailerService.sendMail(
            template.from,
            template.subject,
            email,
            fullTemplate
        );

        if (!sended) throw new Error("Error to send email");

        return _res.status(200).json({ statusCode: 200, sended });
    } catch (error) {
        next(error);
    };
};

export const verifyOTP = async (_req: Request, _res: Response, next: NextFunction) => {
    try {

        const { code } = _req.params;

        const otpService: BaseService<IOtpModel> = _req.app.locals.otpService;
        const otp = await otpService.getRecord({ code });

        if (!otp) throw new ResponseStatus(404, "OTP not found");

        const expireAt = new Date(otp.expiresAt);
        const now = new Date();

        if (now > expireAt) throw new ResponseStatus(400, "OTP has expired");

        return _res.sendStatus(200);
    } catch (error) {
        next(error);
    };
};

export const activateUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { code, password } = _req.body;

        const otpService: BaseService<IOtpModel> = _req.app.locals.otpService;
        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const otp = await otpService.getRecord({ code });
        if (!otp) throw new ResponseStatus(404, "OTP not found");

        const user = await userService.getRecord({ email: otp.user });
        if (!user) throw new ResponseStatus(404, "User not found");

        const salt = genSaltSync();
        user.enabled = true;
        user.password = hashSync(password, salt);

        const wasActivated = await userService.updateRecord({ email: otp.user }, user);
        if (!wasActivated) throw new Error("Error to activate user");

        return _res.status(200).json({ statusCode: 200, message: "User activated" });
    } catch (error) {
        next(error);
    };
};