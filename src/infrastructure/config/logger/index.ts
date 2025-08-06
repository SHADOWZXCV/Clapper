import { EnvironmentList } from "../../../application/ports/environment.port.js";

const createDefaultConfig = (env: EnvironmentList, path: string) => {
    return {
        development: {
            transport: {
                targets: [{
                    target: 'pino-pretty',
                    level: 'debug',
                    options: {
                        colorize: true,
                        levelFirst: true,
                        translateTime: 'SYS:standard',
                    }
                }]
            },
            level: 'debug'
        },
        production: {
            transport: {
                targets: [{
                    target: 'pino/file',
                    level: 'info',
                    options: {
                        destination: path,
                        mkdir: true,
                        sync: false
                    }
                }]
            },
            level: 'info',
            timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
            messageKey: 'message',
            base: {
                env: env.ENVIRONMENT,
                version: env.VERSION || '1.0.0'
            }
        }
    };
};

export default createDefaultConfig;
