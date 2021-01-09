export interface City {
    id: number;
    name: string;
    state_id: number;
}
export interface State {
    id: number;
    name: string;
    country_id: number;
    cities: City[];
}
export interface Country {
    id: number;
    code: string;
    name: string;
    phonecode: number;
    status: boolean;
    states: State[];
}
export declare const countries: Country[];
