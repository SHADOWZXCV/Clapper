import { config } from "dotenv";
import { EnvironmentPort } from "../../application/ports/environment.port.js";
config({ quiet: true });

class EnvironmentProvider implements EnvironmentPort {
    private readonly envRequired = [
        "ENVIRONMENT",
        "SERVER_HOST",
        "SERVER_HTTP_PORT",
        "SERVER_SOCKET_PORT",
        "DB_USER",
        "DB_PASSWORD",
        "DB_HOST",
        "DB_PORT",
        "DB_NAME"
    ];

    public readonly env: Record<string, string> = {};

    async init() {
        const missing = [];
        for (const variable of this.envRequired) {
            if (!process.env[variable]) {
                missing.push(variable);
            }

            this.env[variable] = process.env[variable];
        }

        if (missing.length) {
            throw new Error(`Missing environment variables: ${missing}`);
        }
    }

    assertExistenceOf(requiredVariable: string): void {
        if (Object.keys(this.env).includes(requiredVariable))
            throw new Error(`${requiredVariable} IS A REQUIRED FIELD`);
    }
}

export default EnvironmentProvider;
