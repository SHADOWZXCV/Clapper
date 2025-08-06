import { BasePort } from "./base.port.js";
import { EnvironmentList, EnvironmentPort } from "./environment.port.js";

export interface AppLogger {
    info(msg: string): void;
    error(msg: string): void;
    debug(msg: string): void;
    warn(msg: string): void;
}

interface LoggerPort<TLogger = AppLogger> extends BasePort {
    logger: TLogger;
    init(environment: EnvironmentList): Promise<void>;
}

export default LoggerPort
