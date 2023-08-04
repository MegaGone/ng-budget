import { IResponseStatus } from "../IResponseStatus";

export interface ICurrencies extends IResponseStatus {
    currencies: ICurrency[];
};

export interface ILanguages extends IResponseStatus {
    languages: ILanguage[];
};

export interface ICurrency {
    country: string;
    flag: string;
    symbol: string;
};

export interface ILanguage {
    country: string;
    flag: string;
    lang: string;
};