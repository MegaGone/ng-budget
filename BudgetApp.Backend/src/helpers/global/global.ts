import { genSaltSync, hashSync } from "bcrypt";
import nodeRSA from "node-rsa";
import { PRIVATE_KEY, PUBLIC_KEY } from "src/config";

export const generateRandomPassword = (length: number = 18): string => {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const randomPassword = [...Array(length)]
        .map(() => Math.random().toString(36).charAt(2))
        .join('');

    const hashedPassword = hashSync(randomPassword, salt);
    return hashedPassword;
};

export const generateKeyPairs = (): [publicKey: string, privateKey: string] | [] => {
    try {
        const key = new nodeRSA();
        const publicKey = key.exportKey('pkcs8-public-pem');
        const privateKey = key.exportKey('pkcs8-private-pem');

        return [publicKey, privateKey];
    } catch (error) {
        return [];
    };
};

export const cryptText = (data: string | Buffer): string  => {
    try {
        const key = new nodeRSA(PUBLIC_KEY);
        return key.encrypt(data, "base64");
    } catch (error) {
        return "";
    };
};

export const decryptText = (data: string): string => {
    try {
        const key = new nodeRSA(PRIVATE_KEY);
        return key.decrypt(data, "utf8");
    } catch (error) {
        return "";
    };
};