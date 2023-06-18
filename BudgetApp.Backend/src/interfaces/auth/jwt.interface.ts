import { JwtPayload } from "jsonwebtoken";
import { ROLE_ENUM } from "src/enums";

export interface UserPayload extends JwtPayload {
    uid: string;
    iat: number;
    exp: number;
    role: ROLE_ENUM;
};