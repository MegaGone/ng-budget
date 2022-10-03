import { Request, Response } from "express";
import { compareSync } from "bcrypt";

// Models
import { IUser } from "../interfaces";
import { AuthResponse, ResponseStatus, User } from "../models";
import { generateJWT } from "../helpers";

export const register = async (_req: Request, res: Response) => {
    res.send('REGISTER');
};

export const loginWithCredentials = async (_req: Request, res: Response) => {
    const { email, password } = _req.body;

    try {
        const userDB: IUser | null = await User.findOne({ email });

        if (!userDB) return res.status(404).json(new ResponseStatus(404, "User not found"));

        if (!userDB.enabled) return res.status(401).json(new ResponseStatus(401, "You are blocked"));

        const validPassword = compareSync(password, userDB.password);

        if (!validPassword) return res.status(400).json(new ResponseStatus(400, "Credentials not valid"));

        const token: any = await generateJWT(userDB.id);

        return res.status(200).json(new AuthResponse(200, token, userDB));

    } catch(e) {
        return res.status(500).json(new ResponseStatus(500, "Something has gone wrong, try again later"));
    }
};

export const loginWithGoogle = async (_req: Request, res: Response) => {
    res.send('GOOGLE');
};

export const getSession = async (_req: Request, res: Response) => {
    res.send('SESSION');
};