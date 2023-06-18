import { sign } from "jsonwebtoken";
import { SECRETKEY, SESSION_LIFETIME } from "src/config";
import { ROLE_ENUM } from "src/enums";

export const generateJWT = (uid: string, role: ROLE_ENUM): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {

        console.log('----------------------------------------------------->', uid);
        sign({ uid, role }, SECRETKEY, 
        { 
            expiresIn: SESSION_LIFETIME
        }, 
        (err, token) => (err) ? reject(undefined) : resolve(token));
    });
};