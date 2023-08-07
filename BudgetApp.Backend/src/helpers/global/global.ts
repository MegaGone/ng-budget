import { genSaltSync, hashSync } from "bcrypt";
import nodeRSA from "node-rsa";

export const generateRandomPassword = (length: number = 18): string => {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const randomPassword = [...Array(length)]
        .map(() => Math.random().toString(36).charAt(2))
        .join('');

    const hashedPassword = hashSync(randomPassword, salt);
    return hashedPassword;
};

export const cryptText = (data: string, publicKey: string): string | null => {
    try {
        const key = new nodeRSA(publicKey);
        return key.encrypt(data, "base64");
    } catch (error) {
        return null;
    };
};

export const decryptText = (data: string, privateKey: string): string | null => {
    try {
        const key = new nodeRSA(privateKey);
        return key.decrypt(data, 'utf8');
    } catch (error) {
        return null
    };
};