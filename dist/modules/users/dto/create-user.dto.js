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
exports.UserGenderEnum = exports.UserTypeEnum = void 0;
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const bcrypt = __importStar(require("bcrypt"));
class CreateUserDto {
    constructor(name, surname, email, birthday, roles, password, gender, image, status) {
        this._id = uuid_1.v4();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birthday = birthday;
        this.roles = roles;
        this.gender = gender;
        this.image = image;
        if (password) {
            this.password = bcrypt.hashSync(password, 10);
        }
        this.status = status;
    }
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: 'El campo nombre es requerido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: 'El campo apellido es requerido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "surname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    class_validator_1.IsEmail(undefined, {
        message: 'El correo electrónico es invalido',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "birthday", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "image", void 0);
exports.default = CreateUserDto;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["ADMIN"] = "admin";
    UserTypeEnum["BRANCH_ADMIN"] = "branch_admin";
    UserTypeEnum["CLIENT"] = "client";
    UserTypeEnum["BRIGADISTA"] = "brigadista";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
var UserGenderEnum;
(function (UserGenderEnum) {
    UserGenderEnum["MEN"] = "men";
    UserGenderEnum["WOMAN"] = "woman";
    UserGenderEnum["OTHER"] = "other";
})(UserGenderEnum = exports.UserGenderEnum || (exports.UserGenderEnum = {}));
//# sourceMappingURL=create-user.dto.js.map