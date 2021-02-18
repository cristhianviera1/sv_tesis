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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientUserDto = void 0;
const class_validator_1 = require("class-validator");
const create_user_dto_1 = __importDefault(require("./create-user.dto"));
const swagger_1 = require("@nestjs/swagger");
const bcrypt = __importStar(require("bcrypt"));
class CreateClientUserDto extends create_user_dto_1.default {
    constructor(name, surname, email, roles, password, status, birthday, gender) {
        super(name, surname, email, birthday, roles, password);
        this.name = name;
        this.surname = surname;
        if (password) {
            this.password = bcrypt.hashSync(password, 10);
        }
        this.email = email;
        this.status = status;
        this.roles = roles;
        this.gender = gender;
    }
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], CreateClientUserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: 'El apellido es requerido' }),
    __metadata("design:type", String)
], CreateClientUserDto.prototype, "surname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEmail(undefined, {
        message: 'El correo electrónico es inválido',
    }),
    class_validator_1.IsNotEmpty({ message: 'El correo electrónico es requerido' }),
    __metadata("design:type", String)
], CreateClientUserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateClientUserDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateClientUserDto.prototype, "device", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateClientUserDto.prototype, "roles", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' }),
    __metadata("design:type", Number)
], CreateClientUserDto.prototype, "birthday", void 0);
exports.CreateClientUserDto = CreateClientUserDto;
//# sourceMappingURL=create-client-user.dto.js.map