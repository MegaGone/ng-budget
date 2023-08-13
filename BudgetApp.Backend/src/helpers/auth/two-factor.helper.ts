import speakeasy, { GeneratedSecret } from "speakeasy";
import { toDataURL } from "qrcode";
import { cryptText, decryptText } from '../global/global';

export const generateSeed2FA = async (user: string): Promise<{ data: string, secret: string }> => {
    return new Promise((resolve, reject) => {

        const secret: GeneratedSecret = speakeasy.generateSecret({
            name: `NgBudget: ${user}`
        });

        toDataURL(secret.otpauth_url, "", (err, data) => {
            (err) ? reject(null) : resolve({ data, secret: cryptText(secret.base32)! });
        });
    });
};

export const verify2FA = (code: string, secret: string): boolean => {
    try {
        const isCorrectOTP = speakeasy.totp.verify({
            secret: decryptText(secret)!,
            encoding: "base32",
            token: code
        });

        return isCorrectOTP;
    } catch (error) {
        return false;
    };
};