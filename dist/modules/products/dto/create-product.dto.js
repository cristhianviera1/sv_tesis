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
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
class CreateProductDto {
    constructor(name, stock, price, detail, image) {
        this._id = uuid_1.v4();
        this.name = name;
        this.stock = stock;
        this.price = price;
        this.detail = detail;
        this.image = image;
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'El campo nombre es requerido' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'El campo stock es requerido' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'El campo precio es requerido' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'El campo detalle es requerido' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detail", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'El campo imagen es requerido' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "image", void 0);
exports.default = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map