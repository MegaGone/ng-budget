import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
    uid: string;
    iat: number;
    exp: number;
};