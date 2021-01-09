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
class UpdateEmployeeDto {
    constructor(dni, name, phone, email) {
        this.dni = dni;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this._id = uuid_1.v4();
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "dni", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsPhoneNumber('EC', { message: 'El numero celular es invalido' }),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(undefined, {
        message: 'El correo electrónico es invalido',
    }),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "email", void 0);
exports.default = UpdateEmployeeDto;
//# sourceMappingURL=udpate-employee.dto.js.map