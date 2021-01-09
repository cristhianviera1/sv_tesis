import { State } from '../state.model';
export declare class CountryDto {
    _id: string;
    code: string;
    name: string;
    phone_code: number;
    states: State[];
    constructor(code: string, name: string, phone_code: number, states: State[]);
}
