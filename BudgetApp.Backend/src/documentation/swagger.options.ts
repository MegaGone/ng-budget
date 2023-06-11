import { PORT } from "src/config"
import { FieldsResponse, ResponseStatus } from './';

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
                ResponseStatus
            }
        }
    },
    apis: ['**/routes/*.ts']
};