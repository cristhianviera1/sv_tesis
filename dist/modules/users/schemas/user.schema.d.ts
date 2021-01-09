import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserGender, UserType } from '../dto/create-user.dto';
export declare class User extends Document {
    _id: string;
    dni: string;
    name: string;
    surname: string;
    password: string;
    email: string;
    status?: boolean;
    devices?: string[];
    roles: UserType;
    gender?: UserGender;
    birthday?: number;
    image?: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}
export declare const UserSchema: mongoose.Schema<any>;
