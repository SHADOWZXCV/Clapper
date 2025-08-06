import { BasePort } from "./base.port.js";

export interface DatabasePort extends BasePort {
    getInstance(): unknown;
}
