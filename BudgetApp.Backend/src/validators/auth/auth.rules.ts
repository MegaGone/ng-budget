import { genericStringRule, genericRolesRule } from "src/helpers";
import { ROLES_SEED } from "src/constants";

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