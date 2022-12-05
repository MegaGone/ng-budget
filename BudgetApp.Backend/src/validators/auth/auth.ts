import { genericStringRule } from "../../helpers";


export const registerUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ['name', 'lastName', 'email', 'password'],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            'password',
            {
                requiredType: "string",
                warnings: "Password is not a string, is empty or is weak."
            },
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        ),
        genericStringRule(
            'role',
            {
                requiredType: "string",
                warnings: "This is not a string or is empty"
            },
            null,
            false
        ),
        ...newRules
    ];
};

export const loginValidatonRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ['email', 'password'],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        ...newRules
    ];
};