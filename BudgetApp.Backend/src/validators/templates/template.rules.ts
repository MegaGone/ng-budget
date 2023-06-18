import { PARAM_LOCATION } from "src/enums";
import { genericStringRule, genericGuidRule, genericPaginationRule } from "src/helpers";

export const createTemplateValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["subject", "template"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            "from",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            },
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        ),
        ...newRules
    ];
};

export const genericTemplateIdValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericGuidRule(
            "id",
            {
                location: PARAM_LOCATION.PARAM,
                warnings: "This field doesn't exists, is not a valid identificator or is empty."
            }
        ),
        ...newRules
    ];
};

export const updateTemplateValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["subject", "template"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            "identificator",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string, is empty or is not a valid identificator."
            },
            /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/
        ),
        genericStringRule(
            "from",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            },
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        ),
        ...newRules
    ];
};

export const getTemplatesValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericPaginationRule(
            ["pageSize", "page"],
            {
                location: PARAM_LOCATION.QUERY_PARAM,
                warnings: "This field doesn't exists, is not a integer os is empty."
            }
        ),
        ...newRules
    ];
};