import express, { Application } from "express";
import cors from "cors";
import Swagger from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { PORT } from "src/config";
import { SwaggerOptions } from "src/documentation";
import { LoggerClient } from "src/clients";
import { MorganMiddleware, ErrorHandler } from "src/middlewares";
import { userRouter } from "src/routes";
import { Datasource } from "src/database";
import { Local } from "./";

export class Server {
    private app: Application
    private port: string;
    private logger: LoggerClient;
    private specs: object;
    private datasource: Datasource;

    constructor() {
        this.app = express();
        this.port = PORT;
        this.logger = new LoggerClient();
        this.specs = swaggerJSDoc(SwaggerOptions);
        this.datasource = new Datasource();

        this.dbConnection();
        this.middlewares();
        this.routes();
        this.locals();
        this.onFinish();
    };

    /**
     * INITIALIZE MIDDLEWARES
     */
    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(MorganMiddleware(this.logger));
        this.app.use(ErrorHandler);
    };

    /**
     * INITIALIZE ROUTES
     */
    private routes(): void {
        this.app.use('/api/docs', Swagger.serve, Swagger.setup(this.specs));
        this.app.use('/api/', [userRouter]);
    };

    /**
     * INITIALIZE DB CONNECTION
     */
    private async dbConnection() {
        try {
            await this.datasource.connect();
            const status = this.datasource.status();

            if (status !== 1) throw new Error("[ERROR][DATABASE][INIT]");

            console.log("[DATABASE][INIT]", "Connected")
        } catch (error) {
            console.log(error, "ERROR TO CONNECT");
        };
    };

    /**
     * INITIALIZE LOCALS
     */
    private locals() {
        this.app.locals.logger = this.logger;
        this.app.locals = new Local();
    }

    /**
     * START HTTP SERVER
     */
    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port}`);
        });
    };

    /**
     * DESTROY LOCALS
     */
    private onFinish() {
        process.on('SIGINT', async () => {
            process.exit();
        })
    }
};