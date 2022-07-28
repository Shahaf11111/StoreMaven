import compression from 'compression';
import cors from 'cors';
import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import { connect, set } from 'mongoose';
import { NODE_ENV, PORT, DB_CONNECTION } from 'config';
import { Routes } from 'interfaces/routes.interface';
import errorMiddleware from 'middlewares/error.middleware';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`======= ENV: ${this.env} =======`);
            console.info(`🚀 App listening on port ${this.port}`);
            console.info(`=================================`);
        });
    }

    public getServer() {
        return this.app;
    }

    private connectToDatabase() {
        if (this.env !== 'production') {
            set('debug', true);
        }
        connect(DB_CONNECTION);
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;
