import { IResponseStatus } from "../IResponseStatus";

export interface ISettings extends IResponseStatus {
    currencies: ICurrency[];
};

export interface ICurrency {
    country: string;
    flag: string;
    symbol: string;
};