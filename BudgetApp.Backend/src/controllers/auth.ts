import { Request, Response } from "express";

export const register = async (_req: Request, res: Response) => {
    res.send('REGISTER');
};

export const loginWithCredentials = async (_req: Request, res: Response) => {
    res.send('LOGIN');
};

export const loginWithGoogle = async (_req: Request, res: Response) => {
    res.send('GOOGLE');
};

export const getSession = async (_req: Request, res: Response) => {
    res.send('SESSION');
};