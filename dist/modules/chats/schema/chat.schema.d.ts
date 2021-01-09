import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface Message {
    type: 'text' | 'image';
    message: string;
}
export interface EmitMessage {
    userFrom: string;
    toUser: string;
    message: Message;
    timeStamp: number;
}
export interface JoinRoom {
    userFrom: string;
    toUser: string;
}
export declare class Chat extends Document {
    _id: string;
    fromUser: string;
    toUser: string;
    message: Message;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}
export declare const ChatSchema: mongoose.Schema<any>;
