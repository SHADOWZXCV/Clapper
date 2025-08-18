import pino from "pino";
import pinoHttp from "pino-http";
import LoggingPort from "../../application/ports/logger.port.js";
import createDefaultConfig from "../config/logger/pino.index.js";
import { EnvironmentList } from "../../application/ports/environment.port.js";

export type PinoLogger =  ReturnType<typeof pino.pino>;

class LoggingProvider implements LoggingPort<PinoLogger> {
    public logger: PinoLogger;
    
    async init(environmentProvider: EnvironmentList) {
        const logProductionPath = "logs/app.log";
        const mode = environmentProvider.ENVIRONMENT;
        const config = createDefaultConfig(environmentProvider, logProductionPath);

        this.logger = pino.pino(config[mode]);

        this.logger.info("Pino logger is configured!");
    }
    
}

export default LoggingProvider;
