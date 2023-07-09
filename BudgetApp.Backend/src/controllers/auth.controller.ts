import { Request, Response, NextFunction } from "express";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { verify } from "jsonwebtoken";

import { IOtpModel, ITemplateModel, IUserModel, UserModel } from "src/database";
import { BaseService } from "src/services";
import { IUser } from "src/interfaces";
import { ResponseStatus } from "src/models";
import { convertTemplate, generateJWT, generateOTP, generateRandomPassword, generateSeed2FA, validateOtp, verify2FA } from "src/helpers";
import { ACTIVATE_USER_TEMPLATE_ID, BASE_URL, FORGOT_PASSWORD_TEMPLATE_ID, SECRETKEY } from "src/config";
import { Mailer } from "src/clients";
import { ROLE_ENUM } from "src/enums";

export const registerUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { email, name, lastName, displayName, avatar, role } = _req.body;

        if (role == ROLE_ENUM.ADMIN && _req.role != ROLE_ENUM.ADMIN) throw new ResponseStatus(403, "Forbidden");

        // SERVICES
        const templateService: BaseService<ITemplateModel> = _req.app.locals.mailService;
        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const otpService: BaseService<IOtpModel> = _req.app.locals.otpService;
        const mailerService: Mailer = _req.app.locals.mailer;

        // EMAIL VALIDATION
        const emailExists = await userService.getRecord({ email: email });
        if (emailExists) throw new ResponseStatus(400, "Email already exists");

        const user: IUser = {
            email,
            name,
            lastName,
            displayName,
            avatar,
            role,
            password: generateRandomPassword()
        };

        // TEMPLATE
        const template = await templateService.getRecord({ identificator: ACTIVATE_USER_TEMPLATE_ID });
        if (!template) throw new ResponseStatus(404, "Template not found");

        // OTP VALIDATION
        const code = generateOTP();
        const otp = await validateOtp(user.email, code, otpService);
        if (!otp) throw new ResponseStatus(400, "Error to generate otp");

        const fields = {
            NAME: user.displayName,
            URL: `${BASE_URL}auth/activate-user?${code}`
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
        if (!isValidPassword) throw new ResponseStatus(400, "Email/Password incorrect.")

        if (!user.seed) {
            const { data, secret } = await generateSeed2FA(user.email);
            return _res.status(200).json({ statusCode: 200, uid: user._id, data, secret });
        };

        return _res.status(200).json({ statusCode: 200, uid: user._id });
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

        const code = generateOTP();
        const otp = await validateOtp(user.email, code, otpService);
        if (!otp) throw new ResponseStatus(400, "Error to generate otp");

        const fields = {
            NAME: user.displayName,
            URL: `${BASE_URL}auth/restore-password?${code}}`,
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

        const wasOtpDeleted = await otpService.deleteRecord({ _id: otp._id });
        if (!wasOtpDeleted) throw new ResponseStatus(400, "Error to validate otp");

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

export const setup2fa = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { uid, seed, code } = _req.body;

        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const user = await userService.getRecord({ _id: uid });
        if (!user) throw new ResponseStatus(404, "User not found");
        if (user.seed) throw new ResponseStatus(403, "2FA already configured.");

        const isValidOtp = await verify2FA(code, seed);
        if (!isValidOtp) return _res.sendStatus(400);

        user.seed = seed;
        const wasUpdated = await userService.updateRecord({ _id: uid }, user);
        if (!wasUpdated) throw new Error("Error unexpected");

        const token = await generateJWT(uid, user.role);
        if (!token) throw new Error("Error unexpected");

        return _res.status(200).json({ statusCode: 200, token, user });
    } catch (error) {
        next(error);
    };
};

export const verify2fa = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { uid, code } = _req.body;

        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const user = await userService.getRecord({ _id: uid });
        if (!user) throw new ResponseStatus(404, "User not found");

        const isValidOtp = await verify2FA(code, user.seed!);
        if (!isValidOtp) throw new ResponseStatus(400, "OTP not valid");

        const token = await generateJWT(uid, user.role);
        if (!token) throw new Error("Error unexpected");

        return _res.status(200).json({ statusCode: 200, token, user });
    } catch (error) {
        next(error);
    };
};

export const renewToken = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { uid } = _req;

        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const user = await userService.getRecord({ _id: uid });
        if (!user) throw new ResponseStatus(404, "User not found");

        const token = await generateJWT(uid, user.role);
        if (!token) throw new Error("Error unexpected");

        return _res.status(200).json({ statusCode: 200, token, user });
    } catch (error) {
        next(error);
    };
};

export const getSession = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const token = _req.header("x-token");
        const jwt: any = await verify(token!, SECRETKEY);
        
        const user = await userService.getRecord({ _id: jwt.uid });
        if (!user) throw new ResponseStatus(404, "User not found");

        return _res.status(200).json({ responseStatus: 200, user });
    } catch (error) {
        next(error);
    };
};