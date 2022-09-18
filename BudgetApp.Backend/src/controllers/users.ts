import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt";
import { ResponseStatus, User, UserResponse, UsersResponse } from "../models";
import { IUser } from "../interfaces";

export const createUser = async (_req: Request, res: Response) => {

    const { name, lastName, email, password, role } = _req.body;

    const realDisplayName: string = `${name} ${lastName}`;

    try {
        const userDB: IUser | null = await User.findOne({ email });

        if (userDB) return res.status(400).json(new ResponseStatus(400, "Email already exist"));

        const user: IUser = new User({ name, lastName, displayName: realDisplayName, email, password, role });

        const salt = genSaltSync();
        user.password = hashSync(password, salt);

        await user.save();

        return res.status(200).json(new ResponseStatus(200));
    } catch (error) {
        console.log(error)
        return res.status(400).json(new ResponseStatus(400, "Error creating user"));
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    
    const { limit = 5, page = 1 } = _req.query;

    try {
        
        const [total, users] = await Promise.all([
            User.countDocuments({ enabled: true }),
            User.find({ enabled: true }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit) * 1)
        ]);

        if (!total || !users.length) return res.status(201).json(new ResponseStatus(201, "No users to show"));

        return res.status(200).json(new UsersResponse(200, users, total, Number(page), Math.ceil(total/Number(limit)), Number(limit)));
    } catch (error) {
        console.error(error);
        return res.status(400).json(new ResponseStatus(400, "Error getting users"));
    }

};

export const getUser = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    try {
        const user: IUser | null = await User.findById(id);

        if (!user) return res.status(400).json(new ResponseStatus(404, "User not found"));

        return res.status(200).json(new UserResponse(200, user));

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error getting user"));
    }
};

export const updateUser = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    const { _id, currentPassword, newPassword, enabled,  ...data } = _req.body;

    try {
        const user: IUser | null = await User.findById(id);

        if (!user) return res.status(400).json(new ResponseStatus(404, "User not found"));

        if (currentPassword && newPassword) {
            const salt = genSaltSync();
            const saltedCurrentPassword = hashSync(currentPassword, salt);

            if (saltedCurrentPassword != user.password) return res.status(400).json(new ResponseStatus(400, "Current password doesn't match"));
            
            data.password = hashSync(newPassword, salt);
        }

        const { name, lastName } = data;
        data.displayName = `${name} ${lastName}`;

        const userDB = await User.findByIdAndUpdate(id, data, { returnDocument: 'after' });

        return res.status(200).json(new UserResponse(200, userDB));

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error updating user"));
    }
};

export const blockUser = async (_req: Request, res: Response) => {
    
    const { id } = _req.params;

    try {

        const userDB: IUser | null = await User.findById(id);

        if (!userDB) return res.status(404).json(new ResponseStatus(404, "User not found"));

        if (!userDB.enabled) return res.status(400).json(new ResponseStatus(400, "User already blocked"));
        
        await User.findOneAndUpdate(
            { _id: id },
            {
                $set: { enabled: false }
            }
        )

        return res.status(200).json(new ResponseStatus(200, "User blocked"));

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error deleting user"));
    }
};

export const deleteAll = async (_req: Request, res: Response) => {

    try {
        const users: IUser[] = await User.find({ enabled: false });

        if (!users.length) return res.status(201).json(new ResponseStatus(201, "All clear"));

        const usersDB = await Object.values(users);

        const usersIds = usersDB.map(user => user._id);

        await usersIds.forEach( id => {
            User.findByIdAndRemove(id, (err: string): any => {
                if (err) return res.status(500).json(new ResponseStatus(500, "Cannot delete all the users"));
            });
        });

        return res.status(200).json(new ResponseStatus(200, "Users deleted"));

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error deleting users"));    
    }

};