import { Request, Response } from "express";

export const createUser = async (_req: Request, res: Response) => {
    res.send('CREATE USER');
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