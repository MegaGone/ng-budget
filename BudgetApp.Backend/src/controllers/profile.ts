import { Request, Response } from "express";
import { getCountriesData } from "../helpers";
import { ICountryData, ICurrency } from '../interfaces';
import { CountryResponse } from "../models";

export const getCurrencies = async(_req: Request, res: Response) => {

    const data = await getCountriesData<ICountryData[]>();

    if (!data.length || !data) return res.status(400).json(new CountryResponse(400, undefined, "Error getting currencies..."))

    const currencies: ICurrency[] = data.map((c: ICountryData) => {
        return {
            country: c?.name?.common,
            flag: c?.flags?.png,
            symbol: (c?.currencies) ? Object.values(c.currencies)[0]['symbol'] : undefined 
        };
    });

    return res.status(200).json(new CountryResponse(200, currencies));
};

export const saveUserSettings = (_req: Request, res: Response) => {
    return res.send('OK');
};