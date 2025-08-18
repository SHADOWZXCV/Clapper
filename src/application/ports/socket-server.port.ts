import { IncomingMessage, Server as HTTPServer } from 'http';
import WebSocket from 'ws';
import { BasePort } from './base.port.js';

export interface WSInternalOptions {
    connectionType: "port" | "attached"
    portNumber?: number
    attachedHTTPServer?: HTTPServer
};

export interface ExtendedWSSocket extends WebSocket {
    isAuthenticated?: boolean
}

export interface SocketServerPort extends BasePort {
    setupConnection(): void;
    _handleSocketConnection(ws: ExtendedWSSocket, req: IncomingMessage): void;
    _handleSocketEvents(ws: ExtendedWSSocket): void;
}
