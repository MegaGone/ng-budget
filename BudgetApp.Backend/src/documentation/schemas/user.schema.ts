import { OpenAPIV3 } from 'openapi-types';

export const UserSchema: OpenAPIV3.SchemaObject = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'User name',
            example: 'Devops',
        },
        lastName: {
            type: 'string',
            description: 'User last name',
            example: 'NgBudget',
        },
        displayName: {
            type: 'string',
            description: 'User display name',
            example: 'DevOps',
        },
        email: {
            type: 'string',
            description: 'User email address',
            example: 'admin@ngbuget.com',
        },
        enabled: {
            type: 'boolean',
            description: 'User enabled status',
            example: true,
        },
        google: {
            type: 'boolean',
            description: 'User linked with Google account',
            example: false,
        },
        uid: {
            type: 'string',
            description: 'User UID',
            example: '6498d52fd0bf7511f8aunm9681',
        },
    },
};