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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const create_product_dto_1 = __importDefault(require("./dto/create-product.dto"));
const generateUnixTimestamp_1 = require("../../utils/generateUnixTimestamp");
const product_schema_1 = require("./schema/product.schema");
let ProductsService = class ProductsService {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }
    async findById(id) {
        const product = await this.findOne({ _id: id });
        if (!product) {
            throw new common_1.NotFoundException('No se ha encontrado el producto con el id proporcionado');
        }
        return product;
    }
    async findOne(conditions) {
        return this.ProductModel.findOne(conditions);
    }
    async list(conditions) {
        return this.ProductModel.find(conditions);
    }
    async create(createProductDto) {
        const newProduct = new create_product_dto_1.default(createProductDto.name, createProductDto.stock, createProductDto.price, createProductDto.detail, createProductDto.image, createProductDto.status);
        return await this.ProductModel.create(newProduct);
    }
    async update(updateProductDto) {
        const product = await this.findById(updateProductDto._id);
        product.name = updateProductDto.name;
        product.stock = updateProductDto.stock;
        product.price = updateProductDto.price;
        product.detail = updateProductDto.detail;
        product.image = updateProductDto.image;
        product.status = updateProductDto.status;
        return await product.save();
    }
    async delete(id) {
        const product = await this.findById(id);
        product.deleted_at = generateUnixTimestamp_1.generateUnixTimestamp();
        await product.save();
        return true;
    }
    async changeStock(id, quantity, add) {
        const product = await this.findById(id);
        add ? product.stock += quantity : product.stock -= quantity;
        await product.save();
        product.markModified('stock');
        return true;
    }
    getSafeParameters(product) {
        return Object.assign(Object.assign({}, product.toObject()), { stock: undefined, status: undefined, created_at: undefined, updated_at: undefined, deleted_at: undefined });
    }
};
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map