import { OpenAPIV3 } from 'openapi-types';

export const TemplateSchema: OpenAPIV3.SchemaObject = {
    type: 'object',
    properties: {
        subject: {
            type: 'string',
            description: 'Subject email',
            example: 'Forgot password',
        },
        from: {
            type: 'string',
            description: 'Sender description',
            example: 'noreply@ngbudget.com',
        },
        template: {
            type: 'string',
            description: 'Template in HTML',
            example: '<h1>Hello world</h1>',
        },
        fields: {
            type: 'array',
            description: 'Template fields',
            example: ['name', 'url'],
            items: {
                type: 'string',
            },
        },
    },
};