import { Document } from 'mongoose';
import { Address } from '../../addresses/address.model';
import { User } from '../../users/schemas/user.schema';
export declare class BranchOffice extends Document {
    _id: string;
    name: string;
    address: Address;
    email: string;
    status?: boolean;
    employees?: User[];
    created_at: number;
    updated_at: number;
    deleted_at: number;
    constructor();
}
export declare const BranchOfficeSchema: import("mongoose").Schema<any>;
