type FieldValidationError = {
    field: string
    message: Record<string, string>
}

type FieldValidationMessage = {
    requiredType: string
    warnings: string
}

export { FieldValidationMessage, FieldValidationError }