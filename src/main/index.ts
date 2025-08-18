import { DatabasePort } from "../application/ports/database.port.js";
import { EnvironmentList, EnvironmentPort } from "../application/ports/environment.port.js";
import { HttpServerPort } from "../application/ports/http-server.port.js";
import LoggingPort, { AppLogger } from "../application/ports/logger.port.js";
import { SocketServerPort } from "../application/ports/socket-server.port.js";

class ProviderRegistry {
    private static envProvider: EnvironmentPort;
    private static loggerProvider: LoggingPort;
    private static databaseProvider: DatabasePort;
    private static serverProvider: HttpServerPort;
    private static socketServerProvider: SocketServerPort;
    private static env: Record<string, string>;
    private static logger: AppLogger;

    static async initProviders(
        EnvironmentProvider: new () => EnvironmentPort,
        LoggingProvider: new () => LoggingPort,
        DatabaseProvider: new (logger: AppLogger, env: EnvironmentList) => DatabasePort,
        ServerProvider: new (logger: AppLogger, env: EnvironmentList) => HttpServerPort,
        WebSocketServerProvider: new (logger: AppLogger, envProv: EnvironmentPort) => SocketServerPort
    ) {
        this.loggerProvider = new LoggingProvider();
        this.envProvider = new EnvironmentProvider();
        
        await this.envProvider.init();
        this.env = this.envProvider.env;

        await this.loggerProvider.init(this.env);
        this.logger = this.loggerProvider.logger;

        this.databaseProvider = new DatabaseProvider(this.logger, this.env);
        this.serverProvider = new ServerProvider(this.logger, this.env);
        this.socketServerProvider = new WebSocketServerProvider(this.logger, this.envProvider);

        await this.databaseProvider.init();
        await this.serverProvider.init();
        await this.socketServerProvider.init({
            connectionType: "port",
            portNumber: this.env.SERVER_SOCKET_PORT
        });
    }

    static getDatabase(): ReturnType<DatabasePort['getInstance']> { return this.databaseProvider.getInstance(); }
    static getServer(): ReturnType<HttpServerPort['getInstance']> { return this.serverProvider.getInstance(); }
}

export default ProviderRegistry;
