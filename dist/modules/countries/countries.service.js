"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
const country_schema_1 = require("./schema/country.schema");
const mongoose_1 = require("mongoose");
const state_model_1 = require("./state.model");
const city_model_1 = require("./city.model");
const countries_1 = require("../../utils/dataset/countries");
const mongoose_2 = require("@nestjs/mongoose");
const country_dto_1 = require("./dto/country.dto");
let CountriesService = class CountriesService {
    constructor(countryModel) {
        this.countryModel = countryModel;
    }
    async getAll() {
        return this.countryModel.find();
    }
    async getByCountryName(country_name) {
        return this.countryModel.findOne({
            name: { $regex: new RegExp(country_name, 'i') },
        });
    }
    async populate() {
        const currentCountries = await this.countryModel.findOne();
        if (!currentCountries) {
            const savedCountries = countries_1.countries.map(async (countryData) => {
                return (await this.countryModel.create(new country_dto_1.CountryDto(countryData.code, countryData.name, countryData.phonecode, countryData.states.map(state => {
                    return new state_model_1.State(state.name, state.cities.map(city => new city_model_1.City(city.name)));
                })))).save();
            });
            return savedCountries;
        }
    }
};
CountriesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(country_schema_1.Country.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CountriesService);
exports.CountriesService = CountriesService;
//# sourceMappingURL=countries.service.js.map