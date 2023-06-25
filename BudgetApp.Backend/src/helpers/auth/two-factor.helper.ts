import speakeasy, { GeneratedSecret } from "speakeasy";
import { toDataURL } from "qrcode";

export const generateSeed2FA = async (user: string): Promise<null | {}> => {
    return new Promise((resolve, reject) => {

        const secret: GeneratedSecret = speakeasy.generateSecret({
            name: `NgBudget: ${user}`
        });

        toDataURL(secret.otpauth_url, "", (err, data) => {
            (err) ? reject(null) : resolve({ data, secret: secret.base32 });
        });
    });
};

export const verify2FA = (code: string, secret: string): boolean => {
    try {

        const isCorrectOTP = speakeasy.totp.verify({
            secret,
            encoding: "base32",
            token: code
        });

        return isCorrectOTP;
    } catch (error) {
        return false;
    };
};