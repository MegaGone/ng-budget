enum PARAM_LOCATION {
    BODY = "BODY",
    QUERY_PARAM = "QUERY_PARAM",
    HEADER = "HEADER"
};

type FieldValidationError = {
    field: string;
    message: Record<string, string>
};

type FieldValidationMessage = {
    requiredType: string
    warnings: string
}

type FieldIdValidationMessage = {
    warnings: string;
    location: PARAM_LOCATION
};

export { FieldValidationMessage, FieldValidationError, FieldIdValidationMessage, PARAM_LOCATION};