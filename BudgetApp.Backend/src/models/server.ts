import express, { Application } from "express";
import cors from "cors";

import { Auth } from '../routes';

class Server {
    private app  : Application;
    private port : string;
    private paths = {
        auth: '/api/auth'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    private routes() {
        this.app.use(this.paths.auth, Auth.default);
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