import swaggerJsdoc, { Options, SwaggerDefinition } from "swagger-jsdoc";

/**
 * API CONFIG
 */
const swaggerDefinition: SwaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "NgBudget API",
        version: "1.0.0"
    },
    servers: [
        { url: "http://localhost:3000/" }
    ]
}

/**
 * OPTIONS
 */
const options: Options = {
    swaggerDefinition,
    apis: [
        "../routes/*.ts",
        "../routes/*.js"
    ]
}

export const openApiConfig = swaggerJsdoc(options);