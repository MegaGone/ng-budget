import { Request, Response } from "express";
import { getCountriesData, getLocalCountries } from "../helpers";
import { ICountryData, ICurrency, ILanguage } from '../interfaces';
import { CountryResponse } from "../models";
import ResponseStatus from '../models/response';

export const getCurrencies = async (_req: Request, res: Response) => {
    try {
        const data = await getCountriesData<ICountryData[]>();

        if (!data.length || !data) return res.status(404).json(new CountryResponse(404, undefined, `[ERROR][CURRENCIES][NOT FOUND]`));

        const currencies: ICurrency[] = data.map((c: ICountryData) => {
            return {
                country: c?.name?.common,
                flag: c?.flags?.png,
                symbol: (c?.currencies) ? Object.values(c.currencies)[0]['symbol'] : undefined
            };
        });

        return res.status(200).json(new CountryResponse(200, currencies));
    } catch (error) {
        return res.status(200).json(new CountryResponse(200, undefined, `[ERROR][GET][CURRENCIES] - ${error}`));
    }
};

export const getLanguages = async (_req: Request, res: Response) => {
    try {
        const localData = await getLocalCountries();

        const mappedData: ILanguage[] = await localData.map(c => {
            return {
                country: c.name,
                flag: c.flag,
                lang: c.locale
            }
        });

        return res.send(mappedData);

    } catch (error) {
        return res.status(500).json(new ResponseStatus(500, `[ERROR][GET][LANGUAGES] - ${error}`));
    }
};

export const saveUserSettings = (_req: Request, res: Response) => {
    return res.send('OK');
};