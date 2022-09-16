import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt";
import { ResponseStatus, User } from "../models";

export const createUser = async (_req: Request, res: Response) => {
    const { name, lastName, displayName, email, password, role } = _req.body;

    try {
        const user = new User({ name, lastName, displayName, email, password, role});
    
        const salt = genSaltSync();
        user.password = hashSync(password, salt);
    
        await user.save();

        return res.status(200).json(new ResponseStatus(200));
    } catch (error) {
        return res.status(400).json(new ResponseStatus(400, "Error creating user"));
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    res.send('GET USERS');
};

export const getUser = async (_req: Request, res: Response) => {
    res.send('GET USER');
};

export const updateUser = async (_req: Request, res: Response) => {
    res.send('UPDATE USER');
};

export const deleteUser = async (_req: Request, res: Response) => {
    res.send('DELETE USER');
};