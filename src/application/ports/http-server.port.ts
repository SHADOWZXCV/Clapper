import { BasePort } from "./base.port.js";

export interface HttpServerPort extends BasePort {
    setupMiddlewares(): void;
    setupRoutes(): void;
    listenToPort(): void;
    getInstance(): unknown;
}
