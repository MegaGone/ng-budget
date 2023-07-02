import { IOtpModel } from "src/database";
import { BaseService } from "src/services";

export const validateOtp = async (email: string, code: string, otpService: BaseService<IOtpModel>): Promise<boolean> => {
    try {
        const otpDB = await otpService.getRecord({ user: email });

        if (otpDB) {
            try {
                await otpService.deleteRecord({ _id: otpDB._id });
            } catch (error) { };
        };

        const otp = await otpService.insertRecord({ user: email, code: parseInt(code) });

        return (!otp) ? false : true;
    } catch (error) {
        return false;
    };
};