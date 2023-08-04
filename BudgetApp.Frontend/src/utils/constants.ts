import { IHeaderOptions } from "app/interfaces";

export const HEADER_OPTIONS: IHeaderOptions[] = [
    {
        description: "Cerrar sesión",
        icon: "mat_outline:logout",
        method: 1
    }
];

export const LANGUAGES_OPTIONS: { description: string, flag: string, iso: string }[] = [
    {
        description: 'Español',
        flag: 'Spain',
        iso: 'es'
    },
    {
        description: 'English',
        flag: 'United States',
        iso: 'en'
    }
];