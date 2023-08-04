import axios from "axios";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { COUNTRIES_ENDPOINT } from "src/config";

export const getCurrenciesData = async <T>() => {
    try {
        const { data } = await axios.get<T>(COUNTRIES_ENDPOINT);

        return data;
    } catch (e) {
        console.log(`[ERROR][COUNTRIES DATA] - ${e}`);
        return [];
    };
};

export const getLanguanges = async (): Promise<any[]> => {
    try {
        const path: string = resolve(`./src/constants/languages.json`);

        if (!existsSync(path)) return [];

        const rawData = readFileSync(path, { encoding: 'utf8' });
        const data = JSON.parse(rawData);
        return data;

    } catch (e) {
        console.log(`[ERROR][LOCAL LANGUAGES DATA] - ${e}`);
        return [];
    }
};