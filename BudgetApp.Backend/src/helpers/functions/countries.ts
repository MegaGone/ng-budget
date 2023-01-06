import axios from 'axios';
import { COUNTRIES_ENDPOINT } from '../../config';

export const getCountriesData = async <T>() => {
    try {
        const { data } = await axios.get<T>(COUNTRIES_ENDPOINT);

        return data;
    } catch (e) {
        console.log(`[ERROR][COUNTRIES DATA] - ${e}`);
        return [];
    }
};