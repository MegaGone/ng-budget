import { genericStringRule, genericIntegerRule, genericQueryParamIdRule, genericRolesRule } from "src/helpers";
import { PARAM_LOCATION } from "src/enums";
import { ROLES_SEED } from "src/constants";

export const createUserValidationRules = (additionalRules: any = null) => {
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
                warnings: "This field doesn't exist, is not a string or is empty."
            },
            ROLES_SEED,
            false
        ),
        ...newRules
    ];
};

export const getUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];
    
    return [
        genericQueryParamIdRule(
            'userId',
            {
                warnings: "The ID doesn't exist in the queryparam, is not a int or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ]
};

export const updateUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["firstName","lastName"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericIntegerRule(
            ["id","role"],
            {
                requiredType: "int",
                warnings: "This field doesn't exist, is not a integer or is empty."
            }
        ),
        genericStringRule(
            'password',
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            },
            null,
            false
        ),
        ...newRules
    ]
};

export const getUsersValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericIntegerRule(
            "roleId",
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or is empty."
            }
        ),
        genericIntegerRule(
            ["pageSize", "page"],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or is empty."
            },
            {},
            false
        ),
        ...newRules
    ]
};