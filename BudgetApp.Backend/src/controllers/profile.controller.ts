import { Request, Response, NextFunction } from "express";
import { getLanguanges, getCurrenciesData } from "src/helpers";
import { ICountryData, ICurrency, ILanguage } from "src/interfaces";

export const getCurrencies = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const data = await getCurrenciesData<ICountryData[]>();

        if (!data.length || !data) throw new Error("Error to get currencies");

        const currencies: ICurrency[] = data.map((c: ICountryData) => {
            return {
                country: c?.name?.common,
                flag: c?.flags?.png,
                symbol: (c?.currencies) ? Object.values(c.currencies)[0]['symbol'] : undefined
            };
        });

        return _res.status(200).json({ statusCode: 200, currencies });
    } catch (error) {
        next(error);
    };
};

export const getLanguages = async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const localData = await getLanguanges();

        const languages: ILanguage[] = await localData.map(c => {
            return {
                country: c.name,
                flag: `data:image/jpg;base64,${c.flag}`,
                lang: c.locale
            }
        });

        if (!languages.length) throw new Error("Error to get languages");

        return _res.status(200).json({ statusCode: 200, languages });
    } catch (error) {
        next(error);
    };
};

export const saveUserSettings = async (_req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    };
};