import { PARAM_LOCATION } from "src/enums";
import { genericMongoIdRule, genericPaginationRule } from "src/helpers";

export const getUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericMongoIdRule(
            "id",
            {
                location: PARAM_LOCATION.PARAM,
                warnings: "This field is not a string, is empty or is not a valid mongo ID."
            }
        ),
        ...newRules
    ];
};

export const getUsersValidationRules = (additionalRules: any = null) => {
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