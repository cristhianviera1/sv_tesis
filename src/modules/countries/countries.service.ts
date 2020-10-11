import { Injectable } from '@nestjs/common';
import { Country } from './schema/country.schema';
import { Model } from 'mongoose';
import { State } from './state.model';
import { City } from './city.model';
import { countries } from '../../utils/dataset/countries';
import { InjectModel } from '@nestjs/mongoose';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountriesService {
    constructor(
      @InjectModel(Country.name) private countryModel: Model<Country>,
    ) {
    }

    async getAll() {
        return this.countryModel.find();
    }

    async getByCountryName(country_name: string) {
        return this.countryModel.findOne({
            name: { $regex: new RegExp(country_name, 'i') },
        });
    }

    async populate() {
        const currentCountries = await this.countryModel.findOne();
        if (!currentCountries) {
            const savedCountries = countries.map(async countryData => {
                return (
                  await this.countryModel.create(
                    new CountryDto(
                      countryData.code,
                      countryData.name,
                      countryData.phonecode,
                      countryData.states.map(state => {
                          return new State(
                            state.name,
                            state.cities.map(
                              city => new City(city.name),
                            ),
                          );
                      }),
                    ),
                  )
                ).save();
            });
            return savedCountries;
        }
    }
}
