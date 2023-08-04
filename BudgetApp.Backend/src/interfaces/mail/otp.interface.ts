export interface IOtp {
    user: string;
    code: number;
    createdAt: Date;
    expiresAt: Date;
};