import express, { Application } from 'express';
import { HttpServerPort } from '../../application/ports/http-server.port.js';
import { EnvironmentList } from '../../application/ports/environment.port.js';
import { AppLogger } from '../../application/ports/logger.port.js';

class ExpressServerProvider implements HttpServerPort {
    private app: Application;

    constructor(
        private readonly logger: AppLogger,
        private readonly environment: EnvironmentList
    ) {}

    async init() {
        if (!this.app) {
            this.app = express();
            this.setupMiddlewares();
            this.setupRoutes();
            this.listenToPort();
        }
    }

    setupMiddlewares() {

    }

    setupRoutes() {

    }

    listenToPort() {
        const host = this.environment.SERVER_HOST;
        const port = this.environment.SERVER_HTTP_PORT;

        this.app.listen(port, () => {
            this.logger.info(`Express server is running on ${host}:${port}`);
        });
    }

    getInstance(): Application {
        if (!this.app)
            throw new Error("Express server is not initialized!");
        return this.app;
    }
}

export default ExpressServerProvider;
