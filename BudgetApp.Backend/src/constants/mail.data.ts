export const ACTIVATE_USER = (name: string, url: string): string => {
    return `
        <h1>${name}</h1>
        <a>${url}</a>
    `;
};