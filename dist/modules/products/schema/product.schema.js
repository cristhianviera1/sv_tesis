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
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
const generateUnixTimestamp_1 = require("../../../utils/generateUnixTimestamp");
let Product = class Product extends mongoose_1.Document {
};
__decorate([
    mongoose_2.Prop({ default: () => uuid_1.v4() }),
    __metadata("design:type", String)
], Product.prototype, "_id", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    mongoose_2.Prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    mongoose_2.Prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "detail", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    mongoose_2.Prop({ required: true, default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "status", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], Product.prototype, "created_at", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], Product.prototype, "updated_at", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
    }),
    __metadata("design:type", Number)
], Product.prototype, "deleted_at", void 0);
Product = __decorate([
    mongoose_2.Schema()
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_2.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.schema.js.map