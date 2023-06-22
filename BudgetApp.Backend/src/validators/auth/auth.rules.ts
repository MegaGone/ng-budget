import { genericStringRule, genericRolesRule, genericQueryParamRule } from "src/helpers";
import { ROLES_SEED } from "src/constants";
import { PARAM_LOCATION } from "src/enums";

export const registerUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["email","name","lastName","displayName","password"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            "avatar",
            {
                requiredType: "string",
                warnings: "This field is not a string or is empty."
            },
            null,
            false
        ),
        genericRolesRule(
            "role",
            {
                requiredType: "string",
                warnings: "This field is not a string, is empty or is not valid."
            },
            ROLES_SEED,
            false
        ),
        ...newRules
    ];
};

export const loginWithCredentialsValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["email", "password"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        ...newRules
    ];
};

export const verifyOtpValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericQueryParamRule(
            "code",
            {
                location: PARAM_LOCATION.PARAM,
                warnings: "This field doesn't exists, is not a number, is not a valid otp or is empty."
            },
            true,
            /^\d{7}$/
        ),
        ...newRules
    ];
};

export const activateUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            "code",
            {
                requiredType: "string",
                warnings: "This field doesn't exists, is not a valid otp, is not a string or is empty."
            },
            /^\d{7}$/
        ),
        genericStringRule(
            "password",
            {
                requiredType: "string",
                warnings: "This field doesn't exists, is not a string or is empty."
            }
        ),
        ...newRules
    ];
};

export const forgotPasswordValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericQueryParamRule(
            "email",
            {
                location: PARAM_LOCATION.BODY,
                warnings: "This field doesn't exists, is not a valid email or is empty."
            },
            true,
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        ),
        ...newRules
    ];
};