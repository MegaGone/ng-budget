import { check } from 'express-validator';
import { FieldIdValidationMessage, FieldValidationMessage } from '../../types';

export const genericStringRule = (
    field: string | string[],
    message: FieldValidationMessage,
    matches: string | null = null,
    required: boolean = true
) => {
    const stringRule = check(field, message);

    (required) ? stringRule.exists() : stringRule.optional();

    stringRule.notEmpty().isString();
    if (matches) stringRule.matches(matches);
    return stringRule;
};

export const genericIntegerRule = (
    field: string | string[],
    message: FieldValidationMessage,
    options = {},
    required: boolean = true
) => {
    const integerRule = check(field, message);
    (required) ? integerRule.exists() : integerRule.optional();
    return integerRule.toInt().isInt(options);
};

export const genericFloatRule = (
    field: string | string[],
    message: FieldValidationMessage,
    options = {},
    required: boolean = true
) => {
    const floatRule = check(field, message);
    (required) ? floatRule.exists() : floatRule.optional();
    return floatRule.toFloat().isFloat(options);
};

export const genericBooleanRule = (
    field   : string | string[],
    message : FieldValidationMessage,
    required = true
) => {
    const booleanRule = check(field, message);
    (required) ? booleanRule.exists() : booleanRule.optional();
    return booleanRule.isBoolean();
};

export const genericMongoIdRule = (
    field: string | string[],
    message: FieldIdValidationMessage,
    required: boolean = true
) => {
    const mongoIdRule = check(field, message);
    (required) ? mongoIdRule.exists() : mongoIdRule.optional();
    return mongoIdRule.isMongoId();
};