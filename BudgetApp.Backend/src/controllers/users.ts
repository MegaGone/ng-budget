import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt";
import { ResponseStatus, User, UserResponse, UsersResponse } from "../models";

// TODO: FIX TYPE OF USER
export const createUser = async (_req: Request, res: Response) => {
    const { name, lastName, displayName, email, password, role } = _req.body;

    try {
        const user = new User({ name, lastName, displayName, email, password, role });

        const salt = genSaltSync();
        user.password = hashSync(password, salt);

        await user.save();

        return res.status(200).json(new ResponseStatus(200));
    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error creating user"));
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    
    const { limit = 5, page = 1 } = _req.params;

    try {
        
        const [total, users] = await Promise.all([
            User.countDocuments({ enabled: true }),
            User.find({ enabled: true }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit) * 1)
        ]);

        if (!total || !users.length) return res.json(201).json(new ResponseStatus(201, "No users"));

        return res.status(200).json(new UsersResponse(200, users, total, Number(page), Math.ceil(total/Number(limit)), Number(limit)));

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error getting users"));
    }

};

export const getUser = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    try {
        const user = await User.findById(id);

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
        const user = await User.findById(id);

        if (!user) return res.status(400).json(new ResponseStatus(404, "User not fund"));

        if (currentPassword && newPassword) {
            const salt = genSaltSync();
            const saltedCurrentPassword = hashSync(currentPassword, salt);

            if (saltedCurrentPassword != user.password) return res.status(400).json(new ResponseStatus(400, "Current password doesn't match"));
            
            data.password = hashSync(newPassword, salt);
        }

        const userDB = await User.findByIdAndUpdate(id, data, { returnDocument: 'after' });

        return res.status(200).json(new UserResponse(200, userDB));

    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error updating user"));
    }
};

export const deleteUser = async (_req: Request, res: Response) => {
    res.send('DELETE USER');
};