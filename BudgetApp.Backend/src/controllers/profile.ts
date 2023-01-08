import { Request, Response } from "express";
import { getCountriesData, getLocalCountries } from "../helpers";
import { ICountryData, ICurrency, ILanguage } from '../interfaces';
import { CountryData } from "../models";
import ResponseStatus from '../models/response';

export const getCurrencies = async (_req: Request, res: Response) => {
    try {
        const data = await getCountriesData<ICountryData[]>();

        if (!data.length || !data) return res.status(404).json(new CountryData(undefined, 400, `[ERROR][CURRENCIES][NOT FOUND]`));

        const currencies: ICurrency[] = data.map((c: ICountryData) => {
            return {
                country: c?.name?.common,
                flag: c?.flags?.png,
                symbol: (c?.currencies) ? Object.values(c.currencies)[0]['symbol'] : undefined
            };
        });

        return res.status(200).json(new CountryData<ICurrency[]>(currencies, 200));
    } catch (error) {
        return res.status(200).json(new CountryData(undefined, 200, `[ERROR][GET][CURRENCIES] - ${error}`));
    }
};

export const getLanguages = async (_req: Request, res: Response) => {
    try {
        const localData = await getLocalCountries();

        const languages: ILanguage[] = await localData.map(c => {
            return {
                country: c.name,
                flag: c.flag,
                lang: c.locale
            }
        });

        return res.status(200).send(new CountryData<ILanguage[]>(languages, 200));

    } catch (error) {
        return res.status(500).json(new ResponseStatus(500, `[ERROR][GET][LANGUAGES] - ${error}`));
    }
};

export const saveUserSettings = (_req: Request, res: Response) => {
    return res.send('OK');
};