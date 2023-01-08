export interface ICountryData {
    name:         Name;
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    currencies:   Currencies;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    string;
    languages:    Languages;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    fifa:         string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        CoatOfArms;
    coatOfArms:   CoatOfArms;
    startOfWeek:  string;
    capitalInfo:  CapitalInfo;
}

export interface ICurrency {
    country: string;
    flag: string;
    symbol: string;
};

export interface ILocalCountry {
    id:         number;
    name:       string;
    isoAlpha2:  string;
    isoAlpha3:  string;
    isoNumeric: number;
    currency:   Currency;
    flag:       string;
    locale:     string;
    phone:      string;
}

export interface Currency {
    code:   string;
    name:   string;
    symbol: string;
}

export interface ILanguage {
    country: string;
    flag: string;
    lang: string;
};


interface CapitalInfo {
    latlng: number[];
}

interface Car {
    signs: string[];
    side:  string;
}

interface CoatOfArms {
    png: string;
    svg: string;
}

interface Currencies {
    XCD: Xcd;
}

interface Xcd {
    name:   string;
    symbol: string;
}

interface Demonyms {
    eng: Eng;
    fra: Eng;
}

interface Eng {
    f: string;
    m: string;
}

interface Idd {
    root:     string;
    suffixes: string[];
}

interface Languages {
    eng: string;
}

interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

interface NativeName {
    eng: Translation;
}

interface Translation {
    official: string;
    common:   string;
}

export interface Test {
    test: string;
}