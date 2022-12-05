import { genericMongoIdRule, genericStringRule } from "../../helpers";
import { PARAM_LOCATION } from "../../types";

export const updateUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ['name', 'lastName'],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            ['currentPassword', 'newPassword'],
            {
                requiredType: "string",
                warnings: "This field is not a string or is empty."
            },
            null,
            false
        ),
        genericMongoIdRule(
            'id',
            {
                location: PARAM_LOCATION.QUERY_PARAM,
                warnings: "The parameter doesn't exist or is not a mongo id."
            }
        ),
        ...newRules
    ]
};