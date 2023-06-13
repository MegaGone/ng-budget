// export const generateUUID = (): string => {
//     const chars = '0123456789abcdef';
//     const segments = [8, 4, 4, 4, 12];

//     let uuid = '';

//     for (const segment of segments) {
//         for (let i = 0; i < segment; i++) {
//             const randomIndex = Math.floor(Math.random() * chars.length);
//             uuid += chars[randomIndex];
//         }
//         if (segment !== segments[segments.length - 1]) {
//             uuid += '-';
//         }
//     }

//     return uuid;
// };

export const generateGUID = (): string => {
    const s4 = (): string =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);

    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};