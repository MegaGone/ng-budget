import swaggerJsdoc, { Options, SwaggerDefinition } from "swagger-jsdoc";

/**
 * API CONFIG
 */
const swaggerDefinition: SwaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "NgBudget API",
        version: "1.0.0",
        description: "Backend of my project, ng-budget",
        contact: {
            name: "Jimmy Martínez",
            email: "megagonedev@gmail.com",
            url: "https://develsystems.com"
        },
    },
    servers: [
        { url: "http://localhost:3000/api", description: "Local Environment" }
    ],
    components: {
        schemas: {
            createUser: {
                type: "object",
                required: ["name", "lastName", "email", "password"],
                properties: {
                    name        : { type: "string" },
                    lastName    : { type: "string" },
                    email       : { type: "string" },
                    password    : { type: "string" },
                    role        : { type: "string" },
                }
            },
            // user: {
            //     type: "object",
            //     required: ["name", "lastName", "email", "password"],
            //     properties: {
            //         name        : { type: "string" },
            //         lastName    : { type: "string" },
            //         diplayName  : { type: "string" },
            //         email       : { type: "string" },
            //         password    : { type: "string" },
            //         role        : { type: "string" },
            //         enabled     : { type: "boolean" },
            //         google      : { type: "boolean" },
            //         uid         : { type: "string" },
            //     }
            // }
            responseStatus: {
                type: "object",
                required: ["statusCode"],
                properties: {
                    statusCode  : { type: "number" },
                    message     : { type: "string" }
                }
            }
        }
    }
}

/**
 * OPTIONS
 */
const options: Options = {
    swaggerDefinition,
    apis: [
        // "../routes/*.js",
        "./src/routes/user.ts"
    ]
}

export const openApiConfig = swaggerJsdoc(options);