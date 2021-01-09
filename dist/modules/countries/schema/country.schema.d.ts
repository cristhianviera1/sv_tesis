import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { State } from '../state.model';
export declare class Country extends Document {
    _id: string;
    code: string;
    name: string;
    phone_code: number;
    states: State[];
    constructor(code: string, name: string, phone_code: number, states: State[]);
}
export declare const CountrySchema: mongoose.Schema<any>;
