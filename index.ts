import EnvironmentProvider from "./src/infrastructure/providers/dotenv.provider.js";
import DrizzleDatabaseProvider from "./src/infrastructure/providers/drizzle.provider.js";
import ExpressServerProvider from "./src/infrastructure/providers/express.provider.js";
import LoggingProvider from "./src/infrastructure/providers/logger.provider.js";
import WebSocketServerProvider from "./src/infrastructure/providers/socket.provider.js";
import ProviderRegistry from "./src/main/index.js";

ProviderRegistry.initProviders(
    EnvironmentProvider,
    LoggingProvider,
    DrizzleDatabaseProvider,
    ExpressServerProvider,
    WebSocketServerProvider
);
