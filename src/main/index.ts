import { DatabasePort } from "../application/ports/database.port.js";
import { EnvironmentList, EnvironmentPort } from "../application/ports/environment.port.js";
import { HttpServerPort } from "../application/ports/http-server.port.js";
import LoggingPort, { AppLogger } from "../application/ports/logger.port.js";

class ProviderRegistry {
    private static envProvider: EnvironmentPort;
    private static loggerProvider: LoggingPort;
    private static databaseProvider: DatabasePort;
    private static serverProvider: HttpServerPort;
    private static env: Record<string, string>;
    private static logger: AppLogger;

    static async initProviders(
        EnvironmentProvider: new () => EnvironmentPort,
        LoggingProvider: new () => LoggingPort,
        DatabaseProvider: new (logger: AppLogger, env: EnvironmentList) => DatabasePort,
        ServerProvider: new (logger: AppLogger, env: EnvironmentList) => HttpServerPort
    ) {
        this.loggerProvider = new LoggingProvider();
        this.envProvider = new EnvironmentProvider();
        
        await this.envProvider.init();
        this.env = this.envProvider.env;

        await this.loggerProvider.init(this.env);
        this.logger = this.loggerProvider.logger;

        this.databaseProvider = new DatabaseProvider(this.logger, this.env);
        this.serverProvider = new ServerProvider(this.logger, this.env);

        await this.databaseProvider.init();
        await this.serverProvider.init();
    }

    static getDatabase(): ReturnType<DatabasePort['getInstance']> { return this.databaseProvider.getInstance(); }
    static getServer(): ReturnType<HttpServerPort['getInstance']> { return this.serverProvider.getInstance(); }
}

export default ProviderRegistry;
