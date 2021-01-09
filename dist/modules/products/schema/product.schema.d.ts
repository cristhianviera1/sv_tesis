import { Document } from 'mongoose';
export declare class Product extends Document {
    _id: string;
    name: string;
    stock: number;
    price: number;
    detail: string;
    image: string;
    status: boolean;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}
export declare const ProductSchema: import("mongoose").Schema<any>;
