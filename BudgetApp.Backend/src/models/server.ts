import express, { Application } from "express";
import cors from "cors";
import Swagger from "swagger-ui-express";

// ROUTES
import { Auth, User } from '../routes';

// CONFIGURATIONS
import { openApiConfig } from "../docs";
import { dbConnection } from '../database/';
import { PORT } from "../config";

class Server {
    private app  : Application;
    private port : string;

    private paths = {
        auth: '/api/auth',
        docs: '/api/docs',
        user: '/api/user'
    }

    constructor() {
        this.app = express();
        this.port = PORT;

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    private async connectDB() {
        await dbConnection.default()
    }

    private routes() {
        this.app.use(this.paths.auth, Auth.default);
        this.app.use(this.paths.user, User.default);
        this.app.use(this.paths.docs, Swagger.serve, Swagger.setup(openApiConfig));
    }

    /**
     * START APPLICATION
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listen on http://locahost:${this.port || 3000}`);
        });
    }
}

export default Server;