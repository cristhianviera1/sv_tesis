import { Document } from 'mongoose';
export declare class Newness extends Document {
    _id: string;
    title: string;
    description: string;
    image: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}
export declare const NewnessSchema: import("mongoose").Schema<any>;
