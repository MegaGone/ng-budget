export interface IAuthResponse {
    statusCode: number,
    token: string,
    user: IUser,
    message?: string,
}

export interface ILoginResponse {
    statusCode: number;
    uid: string;
    data?: string;
};

export interface IUser {
    email: string;
    name: string;
    lastName: string;
    displayName: string;
    avatar?: string;
    role: "USER_ROLE" | "ADMIN_ROLE";
    enabled: boolean;
    google: boolean;
    uid: string;
}