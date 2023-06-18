import { Request, Response, NextFunction } from "express";

import { IEmailModel, EmailModel } from "src/database";
import { IEmail } from "src/interfaces";
import { ResponseStatus } from "src/models";
import { BaseService } from "src/services";

export const createTemplate = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { subject, from, template } = _req.body;

        const emailService: BaseService<IEmailModel> = _req.app.locals.mailService;
        const id = await emailService.insertRecord({ subject, from, template });
        if (!id) throw new Error("Error to create template");

        return _res.status(200).json({ statusCode: 200, id });
    } catch (error) {
        next(error);
    };
};

export const getTemplate = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { id } = _req.params;

        const emailService: BaseService<IEmailModel> = _req.app.locals.mailService;
        const template = await emailService.getRecord({ identificator: id });

        if (!template) throw new ResponseStatus(404, "Template not found");

        return _res.status(200).json({ statusCode: 200, template });
    } catch (error) {
        next(error);  
    };
};

export const getTemplates = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { pageSize, page } = _req.query;

        const take = parseInt(page as string);
        const skip = parseInt(pageSize as string);

        const emailService: BaseService<IEmailModel> = _req.app.locals.mailService;
        const { data, totalItems, currentPage, pages } = await emailService.getRecords({}, take, skip, []);

        if (!data && !totalItems) throw new Error("Error to get templates");

        return _res.status(200).json({ 
            responseStatus: 200, 
            templates: data,
            count: totalItems,
            currentPage: currentPage,
            pages
        });

    } catch (error) {
        next(error);
    };
};

export const updateTemplate = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const request = <IEmail>_req.body;

        const emailService: BaseService<IEmailModel> = _req.app.locals.mailService;
        const template = await emailService.getRecord({ identificator: request.identificator });

        if (!template) throw new ResponseStatus(404, "Template not found");
        
        template.from = request.from;
        template.subject = request.subject;
        template.template = request.template;

        const wasUpdated = await emailService.updateRecord({ identificator: request.identificator }, template);

        if (!wasUpdated) return new Error("Error to update template");

        return _res.status(200).json({ statusCode: 200 });
    } catch (error) {
      next(error);  
    };
};

export const deleteTemplate = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { id } = _req.params;

        const emailService: BaseService<IEmailModel> = _req.app.locals.mailService;
        const exitsTemplate = await emailService.getRecord({ identificator: id }) != null;

        if (!exitsTemplate) return new ResponseStatus(404, "Template not found");

        const wasDeleted = await emailService.deleteRecord({ identificator: id });
        
        if (!wasDeleted) return new Error("Error to delete template");

        return _res.status(200).json({ statusCode: 200 });
    } catch (error) {
        next(error);
    };
};