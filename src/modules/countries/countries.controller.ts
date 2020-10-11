import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {
    }

    @Get()
    async list(@Query() query) {
        if (query?.country_name) {
            return await this.countriesService.getByCountryName(
              query.country_name,
            );
        }

        return this.countriesService.getAll();
    }

    @Get('populate')
    async populate() {
        return await this.countriesService.populate();
    }
}
