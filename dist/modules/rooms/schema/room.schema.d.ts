import { Document } from 'mongoose';
export declare class Room extends Document {
    _id: string;
    fromUser: string;
    toUser: string;
    last_message: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}
export declare const RoomSchema: import("mongoose").Schema<any>;
