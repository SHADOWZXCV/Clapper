import mysql from "mysql2/promise";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import { AppLogger } from "../../application/ports/logger.port.js";
import { DatabasePort } from "../../application/ports/database.port.js";
import { EnvironmentList } from "../../application/ports/environment.port.js";

class DrizzleDatabaseProvider implements DatabasePort {
    private client: MySql2Database | null = null;

    constructor(
        private readonly logger: AppLogger,
        private readonly environment: EnvironmentList 
    ) {}

    async init() {
        try {
            if (this.client === null) {
                const mysqlPool = await mysql.createPool({
                    host: this.environment.DB_HOST,
                    user: this.environment.DB_USER,
                    password: this.environment.DB_PASSWORD,
                    database: this.environment.DB_NAME,
                    waitForConnections: true,
                    connectionLimit: 10,
                    queueLimit: 0
                });
    
                const conn = await mysqlPool.getConnection();
                await conn.ping();
    
                this.client = drizzle({ client: mysqlPool });
                this.logger.info("Drizzle provider is up and running!");
            }
        } catch (error) {
            this.logger.error(`Database initialization failed: ${error.message}`);
            throw error;
        }
    }

    getInstance(): MySql2Database {
        if (!this.client) {
            throw new Error("Database client is not initialized.");
        }
        return this.client;
    }
}

export default DrizzleDatabaseProvider;
