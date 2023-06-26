import { PORT } from "src/config"
import { FieldsResponse, ResponseStatus, FieldsError, TemplateSchema, UserSchema } from './';

export const SwaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'NgBudget API',
            version: '0.0.1',
            description: 'NgBudget API service documentation.'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ],
        components: {
            schemas: {
                FieldsResponse,
                ResponseStatus,
                TemplateSchema,
                UserSchema
            },
            securitySchemes: {
                'x-token': {
                    type: "apiKey",
                    in: "header",
                    name: "x-token"
                }
            },
            responses: {
                UnauthorizedError: {
                    description: "Token unexpected"
                },
                ForbiddenError: {
                    description: "Unauthorized"
                },
                FieldsError
            }
        }
    },
    apis: ['**/routes/*.ts']
};