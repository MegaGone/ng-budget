export const generateGUID = (): string => {
    const s4 = (): string =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);

    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const generateOTP = (): string => {
    const randomNumber = Math.floor(Math.random() * 9000000);
    const otp = randomNumber.toString().padStart(7, "0");
    return otp;
};