import { City } from './city.model';
export declare class State {
    _id: string;
    name: string;
    cities: City[];
    constructor(name: string, cities: City[]);
}
