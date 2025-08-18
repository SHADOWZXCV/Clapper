import { IncomingMessage } from 'http';
import { 
    Server, 
    ServerOptions as WebSocketServerOptions,
    WebSocketServer 
} from 'ws';

import { AppLogger } from '../../application/ports/logger.port.js';
import { EnvironmentList, EnvironmentPort } from '../../application/ports/environment.port.js';
import { ExtendedWSSocket, SocketServerPort, WSInternalOptions } from '../../application/ports/socket-server.port.js';
import { findKeyValueFromFlatArray } from '../../shared/utils/parsers/Array.js';

class WebSocketServerProvider implements SocketServerPort {
    private readonly environment: EnvironmentList;
    private wss: Server;

    constructor(
        private readonly logger: AppLogger,
        environmentPort: EnvironmentPort
    ) {
        environmentPort.assertExistenceOf("FLAG_WEBSOCKETS");
        this.environment = environmentPort.env;
    }

    async init(options: WSInternalOptions) {
        const wsOptions: WebSocketServerOptions = this._constructWSoptions(options);
        const host = this.environment.SERVER_HOST;
        const port = this.environment.SERVER_HTTP_PORT;

        this.wss = new WebSocketServer(wsOptions);

        this.setupConnection();
        this.logger.info(`Websocket is running on ${host}:${port}`);
    }

    setupConnection() {
        this.wss.on('connection', this._handleSocketConnection.bind(this));
    }

    _handleSocketConnection(ws: ExtendedWSSocket, req: IncomingMessage) {
        const {Authorization: authorizationToken} = findKeyValueFromFlatArray("Authorization", req.rawHeaders);
        
        if (!authorizationToken)
            ws.isAuthenticated = false;

        this._handleSocketEvents(ws);
    }

    _handleSocketEvents(ws: ExtendedWSSocket) {
        ws.on('message',((data) => {
            // NOT implemented yet
        }).bind(this));
        ws.on('close', (() => {
            // NOT implemented yet
        }).bind(this));
    }

    private _constructWSoptions(options: WSInternalOptions): WebSocketServerOptions {
        const wsOptions: WebSocketServerOptions = {};

        if(options.connectionType === "port")
            wsOptions.port = options.portNumber;
        else if(options.connectionType === "attached")
            wsOptions.server = options.attachedHTTPServer;

        return wsOptions;
    }
}

export default WebSocketServerProvider;
