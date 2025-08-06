export interface BasePort {
    init(...args: any[]): Promise<void>;
}
