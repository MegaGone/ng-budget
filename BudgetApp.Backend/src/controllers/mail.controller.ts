import { Request, Response, NextFunction } from "express";

import { IEmailModel, EmailModel } from "src/database";
import { BaseService } from "src/services";

export const createTemplate = async (_req: Request, _res: Response, next: NextFunction) => {
    try {

        const { subject, from, template } = _req.body;

        const emailService: BaseService<IEmailModel> = _req.app.locals.mailService;
        const id = await emailService.insertRecord({ subject, from, template });
        if (!id || id == 0) throw new Error("Error to create template");

        return _res.status(200).json({ statusCode: 200, id });
    } catch (error) {
        next(error);
    };
};