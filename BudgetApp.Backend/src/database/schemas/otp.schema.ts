import { Schema, model } from "mongoose";
import { OTP_MS_LIFETIME } from "src/config";
import { IOtpModel } from "src/database";
import { generateOTP } from "src/helpers";

const OtpSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId required"]
    },
    code: {
        type: String,
        unique: true,
        default: generateOTP()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: Date,
        default: Date.now() + JSON.stringify(OTP_MS_LIFETIME)
    }
}, { _id: false });

export const OtpModel = model<IOtpModel>("Otp", OtpSchema);