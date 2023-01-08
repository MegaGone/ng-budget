import axios from 'axios';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { COUNTRIES_ENDPOINT } from '../../config';
import { ILocalCountry } from '../../interfaces';

export const getCountriesData = async <T>() => {
    try {
        const { data } = await axios.get<T>(COUNTRIES_ENDPOINT);

        return data;
    } catch (e) {
        console.log(`[ERROR][COUNTRIES DATA] - ${e}`);
        return [];
    }
};

export const getLocalCountries = async (): Promise<ILocalCountry[]> => {
    try {
        
        const path = join(__dirname, '../constants/countries.json');

        if (!existsSync(path)) return [];

        const rawData = readFileSync(path, { encoding: 'utf8' });
        const data: ILocalCountry[] = JSON.parse(rawData);
        return data;

    } catch (e) {
        console.log(`[ERROR][LOCAL COUNTRIES DATA] - ${e}`);
        return [];
    }
};