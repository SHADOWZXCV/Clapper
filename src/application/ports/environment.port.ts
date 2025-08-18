import { BasePort } from "./base.port.js";

export type EnvironmentList = Record<string, string>;

export interface EnvironmentPort extends BasePort {
    readonly env: EnvironmentList;

    assertExistenceOf(requiredVariable: string): void;
}
