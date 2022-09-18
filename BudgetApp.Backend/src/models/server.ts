import express, { Application } from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import { openApiConfig } from "../docs";

import { Auth, User } from '../routes';
import { dbConnection } from '../database/';

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
        this.port = process.env.PORT || '3000';

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
        this.app.use(this.paths.docs, serve, setup(openApiConfig));
        this.app.use(this.paths.user, User.default);
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