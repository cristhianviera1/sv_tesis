import { Country } from './schema/country.schema';
import { Model } from 'mongoose';
export declare class CountriesService {
    private countryModel;
    constructor(countryModel: Model<Country>);
    getAll(): Promise<Country[]>;
    getByCountryName(country_name: string): Promise<Country>;
    populate(): Promise<Promise<Country>[]>;
}
