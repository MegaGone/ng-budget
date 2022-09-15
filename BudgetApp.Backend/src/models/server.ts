import express, { Application } from "express";
import cors from "cors";

class Server {
    private app : Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
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