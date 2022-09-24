import swaggerJsdoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

/**
 * API CONFIG
 */
const swaggerDefinition: OAS3Definition = {
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
    basePath: "/api",
    servers: [
        { url: "http://localhost:3000", description: "Local" },
        { url: "https://.../api", description: "Production" }
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
            }
        }
    }
}

/**
 * OPTIONS
 */
const options: OAS3Options = {
    swaggerDefinition,
    apis: ["**/*.ts"]
}

export const openApiConfig = swaggerJsdoc(options);