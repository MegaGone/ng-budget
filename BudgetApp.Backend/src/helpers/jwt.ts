import jwt from "jsonwebtoken";
import { SECRETKEY } from "../config";

export const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
        
        const payload = { uid };

        jwt.sign(payload, SECRETKEY, {
            expiresIn: "4h"
        }, (err, token) => {

            if (err) {
                return reject("400");
            }

            return resolve(token)
        })
    })
};