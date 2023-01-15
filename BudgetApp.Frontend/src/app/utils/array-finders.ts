export function searchByLowerCaseText(text: string, search: string): boolean {
    if (!text || !search) {
        return false;
    }
    return replaceSpecialCharacteres(text)
        .toLowerCase()
        .indexOf(replaceSpecialCharacteres(search).toLowerCase()) > -1;
}

export function replaceSpecialCharacteres(str: string): string {
    if (!str) {
        return '';
    }

    return str
        .replace('á', 'a')
        .replace('é', 'e')
        .replace('í', 'i')
        .replace('ó', 'o')
        .replace('ú', 'u');
}