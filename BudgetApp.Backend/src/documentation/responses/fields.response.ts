import { OpenAPIV3 } from 'openapi-types';

export const FieldsError: OpenAPIV3.ResponseObject = {
    description: "Fields Error",
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    errors: {
                        type: 'object',
                        example: {
                            errors: [
                                {
                                    field: 'email',
                                    message: {
                                        requiredType: 'string',
                                        warnings: 'The field does not exist, is not a string, or must be greater than 0.'
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
};