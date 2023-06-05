import express, { Application } from "express";
import cors from "cors";
import Swagger from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { PORT } from "src/config";
import { SwaggerOptions } from "src/documentation";
import { LoggerClient } from "src/clients";
import { MorganMiddleware, ErrorHandler } from "src/middlewares";
import { userRouter } from "src/routes";
import { GenericDataSource } from "src/database";

export class Server {
    private app: Application
    private port: string;
    private logger: LoggerClient;
    private specs: object;
    private datasource: GenericDataSource;

    constructor() {
        this.app = express();
        this.port = PORT;
        this.logger = new LoggerClient();
        this.specs = swaggerJSDoc(SwaggerOptions);
        this.datasource = new GenericDataSource();

        this.dbConnection();
        this.middlewares();
        this.routes();
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


    private async dbConnection() {
        try {
            await this.datasource.connect();
            const status = await this.datasource.status();

            if (status !== 1) throw new Error(`[ERROR][DATABASE][INIT], ${status}`);

            console.log("[DATABASE][INIT]", "Connected")
        } catch (error) {
            console.log(error)
        };
    };

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
            process.exit()
        })
    }
};