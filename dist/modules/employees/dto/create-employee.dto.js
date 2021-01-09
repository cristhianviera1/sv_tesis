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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = __importDefault(require("../../users/dto/create-user.dto"));
class CreateEmployeeUserDto extends create_user_dto_1.default {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "dni", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "surname", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsPhoneNumber('EC', { message: 'El numero celular es invalido' }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEmail(undefined, {
        message: 'El correo electrónico es invalido',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "email", void 0);
exports.default = CreateEmployeeUserDto;
//# sourceMappingURL=create-employee.dto.js.map