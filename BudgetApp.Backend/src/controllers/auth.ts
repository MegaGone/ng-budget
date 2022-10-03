import { Request, Response } from "express";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { verify } from "jsonwebtoken";

// Models
import { IUser } from "../interfaces";
import { AuthResponse, ResponseStatus, User, UserResponse } from "../models";
import { generateJWT } from "../helpers";

export const register = async (_req: Request, res: Response) => {
    const { name, lastName, email, password, role } = _req.body;

    const displayName: string = `${name} ${lastName}`;

    try {
        const userDB: IUser | null = await User.findOne({ email });

        if (userDB) return res.status(403).json(new ResponseStatus(403, "Email already exist"));

        const user: IUser = new User({ name, lastName, displayName, email, password, role });

        const salt = genSaltSync();
        user.password = hashSync(password, salt);

        await user.save();

        return res.status(200).json(new ResponseStatus(200, "User created"));
    } catch (error) {
        console.log(error)
        return res.status(400).json(new ResponseStatus(400, "Error creating user"));
    }
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
    
    const token = _req.header('x-token');

    try {

        const jwt: any = await verify(token!, process.env.SECRETKEY!);

        const userDB = await User.findById({ _id: jwt.uid });

        if (!userDB) return res.status(404).json(new ResponseStatus(404, "User not found"));

        return res.status(200).json(new UserResponse(200, userDB));
        
    } catch(e) {
        console.log(e);
        return res.status(400).json(new ResponseStatus(400, "Error getting token"));
    }
};