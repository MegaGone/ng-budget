import { OpenAPIV3 } from 'openapi-types';

export const FieldsResponse: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['errors'],
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        required: ['field', 'message'],
        properties: {
          field: { type: 'string', example: "email" },
          message: {
            type: 'object',
            required: ['requiredType', 'warnings'],
            properties: {
              requiredType: { type: 'string', example: "string" },
              warnings: { type: 'string', example: "This field doesn't exist, is not a string or is empty." }
            }
          }
        }
      }
    }
  }
};