import { sign } from "jsonwebtoken";
import { SECRETKEY, SESSION_LIFETIME } from "src/config";

export const generateJWT = (uid: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {

        const payload = { uid };

        sign(payload, SECRETKEY, 
        { 
            expiresIn: SESSION_LIFETIME
        }, 
        (err, token) => (err) ? reject(undefined) : resolve(token));
    });
};