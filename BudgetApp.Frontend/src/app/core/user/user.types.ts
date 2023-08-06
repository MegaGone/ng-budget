export interface User
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    uid: string;
    role: string;
    lastName: string;
    google: boolean;
    enabled: boolean;
    dueDay: number;
    displayName: string;
    currency: string;
}
