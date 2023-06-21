import { Schema, model } from "mongoose";
import { OTP_MS_LIFETIME } from "src/config";
import { IOtpModel } from "src/database";
import { generateOTP } from "src/helpers";

const OtpSchema: Schema = new Schema({
    user: {
        type: String,
        required: [true, "UserId required"]
    },
    code: {
        type: String,
        unique: true,
        required: [true, "Code required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: Date,
        default: Date.now() + OTP_MS_LIFETIME
    }
});

export const OtpModel = model<IOtpModel>("Otp", OtpSchema);