"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountrySchema = exports.Country = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = __importStar(require("mongoose"));
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let Country = class Country extends mongoose_2.Document {
    constructor(code, name, phone_code, states) {
        super();
        this.code = code;
        this.name = name;
        this.phone_code = phone_code;
        this.states = states;
    }
};
__decorate([
    mongoose_1.Prop({
        default: () => uuid_1.v4(),
    }),
    __metadata("design:type", String)
], Country.prototype, "_id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Country.prototype, "code", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ type: 'number' }),
    __metadata("design:type", Number)
], Country.prototype, "phone_code", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.Array }),
    __metadata("design:type", Array)
], Country.prototype, "states", void 0);
Country = __decorate([
    mongoose_1.Schema(),
    __metadata("design:paramtypes", [String, String, Number, Array])
], Country);
exports.Country = Country;
exports.CountrySchema = mongoose_1.SchemaFactory.createForClass(Country);
//# sourceMappingURL=country.schema.js.map