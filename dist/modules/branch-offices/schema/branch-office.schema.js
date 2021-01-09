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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchOfficeSchema = exports.BranchOffice = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
const generateUnixTimestamp_1 = require("../../../utils/generateUnixTimestamp");
const address_model_1 = require("../../addresses/address.model");
let BranchOffice = class BranchOffice extends mongoose_1.Document {
    constructor() {
        super();
        this.employees = [];
    }
};
__decorate([
    mongoose_2.Prop({ default: () => uuid_1.v4() }),
    __metadata("design:type", String)
], BranchOffice.prototype, "_id", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], BranchOffice.prototype, "name", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", address_model_1.Address)
], BranchOffice.prototype, "address", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], BranchOffice.prototype, "email", void 0);
__decorate([
    mongoose_2.Prop({ required: true, default: () => false }),
    __metadata("design:type", Boolean)
], BranchOffice.prototype, "status", void 0);
__decorate([
    mongoose_2.Prop(),
    __metadata("design:type", Array)
], BranchOffice.prototype, "employees", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], BranchOffice.prototype, "created_at", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], BranchOffice.prototype, "updated_at", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
    }),
    __metadata("design:type", Number)
], BranchOffice.prototype, "deleted_at", void 0);
BranchOffice = __decorate([
    mongoose_2.Schema(),
    __metadata("design:paramtypes", [])
], BranchOffice);
exports.BranchOffice = BranchOffice;
exports.BranchOfficeSchema = mongoose_2.SchemaFactory.createForClass(BranchOffice);
//# sourceMappingURL=branch-office.schema.js.map