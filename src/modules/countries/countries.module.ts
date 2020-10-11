import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from './schema/country.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Country', schema: CountrySchema }]),
    ],
    controllers: [CountriesController],
    providers: [CountriesService],
})
export class CountriesModule {
}
