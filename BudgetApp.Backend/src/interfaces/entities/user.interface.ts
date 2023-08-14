import { ROLE_ENUM } from "src/enums";

export interface IUser {
    email: string;
    name: string;
    lastName: string;
    displayName: string;
    password: string;
    avatar?: string;
    role?: ROLE_ENUM;
    enabled?: boolean;
    google?: boolean;
    uid?: string;
    seed?: string;
    dueDay?: string;
    currency?: string;
};