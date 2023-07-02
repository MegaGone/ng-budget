import { genSaltSync, hashSync } from "bcrypt";

export const generateRandomPassword = (length: number = 18): string => {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const randomPassword = [...Array(length)]
        .map(() => Math.random().toString(36).charAt(2))
        .join('');

    const hashedPassword = hashSync(randomPassword, salt);
    return hashedPassword;
};