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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewnessService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const newness_schema_1 = require("./schema/newness.schema");
const mongoose_2 = require("mongoose");
const create_newness_dto_1 = __importDefault(require("./dto/create-newness.dto"));
const generateUnixTimestamp_1 = require("../../utils/generateUnixTimestamp");
let NewnessService = class NewnessService {
    constructor(newnessModel) {
        this.newnessModel = newnessModel;
    }
    async create(createNewnessDto) {
        const newness = new create_newness_dto_1.default(createNewnessDto.title, createNewnessDto.description, createNewnessDto.image);
        const createdNewness = await this.newnessModel.create(newness);
        return createdNewness.save();
    }
    find(id) {
        return this.newnessModel.findOne({ _id: id, deleted_at: null });
    }
    list(conditions) {
        return this.newnessModel.find(conditions).sort({ created_at: -1 });
    }
    async update(updateNewnessDto) {
        const newness = await this.find(updateNewnessDto._id);
        newness.title = updateNewnessDto.title;
        newness.description = updateNewnessDto.description;
        newness.image = updateNewnessDto.image;
        newness.updated_at = generateUnixTimestamp_1.generateUnixTimestamp();
        return newness.save();
    }
    async delete(id) {
        const newness = await this.find(id);
        newness.deleted_at = generateUnixTimestamp_1.generateUnixTimestamp();
        return newness.save();
    }
};
NewnessService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(newness_schema_1.Newness.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NewnessService);
exports.NewnessService = NewnessService;
//# sourceMappingURL=newness.service.js.map