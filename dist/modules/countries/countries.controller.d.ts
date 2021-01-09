import { CountriesService } from './countries.service';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    list(query: any): Promise<import("./schema/country.schema").Country | import("./schema/country.schema").Country[]>;
    populate(): Promise<Promise<import("./schema/country.schema").Country>[]>;
}
