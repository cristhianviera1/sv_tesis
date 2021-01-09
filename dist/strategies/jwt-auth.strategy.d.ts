export interface Payload {
    email: string;
    _id: string;
    phone: string;
    status: boolean;
    devicesToken: string;
    type: string;
    roles: string;
}
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: Payload): Promise<{
        _id: string;
        email: string;
        phone: string;
        devicesToken: string;
        type: string;
        roles: string;
        status: boolean;
    }>;
}
export {};
