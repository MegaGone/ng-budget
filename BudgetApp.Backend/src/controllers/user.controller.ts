import { Request, Response, NextFunction } from "express";
import { IUserModel } from "src/database";
import { ResponseStatus } from "src/models";
import { BaseService } from "src/services";

export const getUserById = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { id } = _req.params;

        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const user = await userService.getRecord({ _id: id });
        if (!user) throw new ResponseStatus(404, "User not found");

        return _res.status(200).json({ statusCode: 200, user });
    } catch (error) {
        next(error);
    };
};

export const updateUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { id } = _req.params;
        const { name, lastName, displayName, avatar, role } = _req.body;

        if (_req.uid == id) throw new ResponseStatus(403, "Forbidden");

        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const user = await userService.getRecord({ _id: id });

        if (!user) throw new ResponseStatus(404, "User not found");

        user.name = name;
        user.lastName = lastName;
        user.displayName = displayName;
        user.avatar = avatar;
        user.role = role;

        const wasUpdated = await userService.updateRecord({ _id: id }, user);
        if (!wasUpdated) throw new Error("Error to update user");

        return _res.status(200).json({ statusCode: 200 });
    } catch (error) {
        next(error);
    };
};

export const deleteUser = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { id } = _req.params;

        if (_req.uid == id) throw new ResponseStatus(403, "Forbidden");
        const userService: BaseService<IUserModel> = _req.app.locals.userService;

        const user = await userService.getRecord({ _id: id });
        if (!user) throw new ResponseStatus(404, "User not found");

        user.enabled = false;
        const wasDisabled = await userService.updateRecord({ _id: id }, user);
        if (!wasDisabled) throw new Error("Error to delete user");

        return _res.status(200).json({ statusCode: 200 });
    } catch (error) {
        next(error);
    };
};

export const getUsers = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const { pageSize, page } = _req.query;

        const take = parseInt(page as string);
        const skip = parseInt(pageSize as string);

        const userService: BaseService<IUserModel> = _req.app.locals.userService;
        const { data, totalItems, currentPage, pages } = await userService.getRecords({}, take, skip, []);

        return _res.status(200).json({
            responseStatus: 200,
            users: data,
            count: totalItems,
            currentPage: currentPage,
            pages
        });

    } catch (error) {
        next(error);
    };
};