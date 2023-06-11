import { OpenAPIV3 } from 'openapi-types';

export const ResponseStatus: OpenAPIV3.SchemaObject = {
    type: "object",
    required: ["statusCode", "message"],
    properties: {
        statusCode: {
            type: "integer",
            example: 200,
            title: "status"
        },
        message: {
            type: "string",
            example: "Is simply dummy text of the printing and typesetting industry"
        }
    }
};