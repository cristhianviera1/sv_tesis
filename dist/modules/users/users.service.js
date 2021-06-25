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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const create_user_dto_1 = __importStar(require("./dto/create-user.dto"));
const generateUnixTimestamp_1 = require("../../utils/generateUnixTimestamp");
const bcrypt = __importStar(require("bcrypt"));
const mailer_message_1 = require("../../consts/mailer-message");
const generatePassword_1 = require("../../utils/generatePassword");
const mailerService_1 = require("../../utils/mailerService");
const create_client_user_dto_1 = require("./dto/create-client-user.dto");
let UsersService = class UsersService {
    constructor(User, mailerService) {
        this.User = User;
        this.mailerService = mailerService;
    }
    async list(condition, start = 0, items = 20) {
        return this.User.find(condition)
            .skip(start)
            .limit(items);
    }
    async createClient(createClientUserDto) {
        if (await this.existingEmail(createClientUserDto === null || createClientUserDto === void 0 ? void 0 : createClientUserDto.email)) {
            throw new common_1.ConflictException('Ya existe un usuario con ese correo electrónico.');
        }
        const generatedPassword = generatePassword_1.generateRandomPassword();
        const client = new create_client_user_dto_1.CreateClientUserDto(createClientUserDto.name, createClientUserDto.surname, createClientUserDto.email, create_user_dto_1.UserTypeEnum.CLIENT, generatedPassword, true, createClientUserDto.birthday, createClientUserDto.gender);
        const createdUser = new this.User(client);
        this.mailerService.sendMail(createClientUserDto.email, mailer_message_1.PasswordSubject, mailer_message_1.PasswordHtml(generatedPassword, `${createdUser.name} ${createdUser.surname}`));
        return createdUser.save();
    }
    async create(createUserDto) {
        if (await this.existingEmail(createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.email)) {
            throw new common_1.ConflictException('Ya existe un usuario con ese correo electrónico.');
        }
        const password = createUserDto.password || generatePassword_1.generateRandomPassword();
        const user = new create_user_dto_1.default(createUserDto.name, createUserDto.surname, createUserDto.email, createUserDto.birthday, createUserDto.roles, password, createUserDto.gender, createUserDto.image, createUserDto.status);
        const createdUser = new this.User(user);
        if (!createUserDto.password) {
            this.mailerService.sendMail(createUserDto.email, mailer_message_1.PasswordSubject, mailer_message_1.PasswordHtml(password, `${createdUser.name} ${createdUser.surname}`));
        }
        return createdUser.save();
    }
    async findOne(conditions) {
        const user = await this.User.findOne(conditions);
        if (!user) {
            throw new common_1.NotFoundException('No se ha encontrado el usuario');
        }
        return user;
    }
    async findById(id) {
        const user = this.findOne({ _id: id, deleted_at: null });
        if (!user) {
            throw new common_1.NotFoundException('No se ha encontrado el usuario');
        }
        return user;
    }
    async delete(id) {
        const user = await this.findOne({ _id: id });
        user.deleted_at = generateUnixTimestamp_1.generateUnixTimestamp();
        return user.save();
    }
    async update(updateUserDto) {
        const user = await this.findOne({ _id: updateUserDto.id });
        if (!user) {
            throw new common_1.NotFoundException('No se ha encontrado el usuario específicado');
        }
        if (updateUserDto.email !== user.email &&
            !!!(await this.existingEmail(updateUserDto.email))) {
            throw new common_1.ConflictException('Ya existe un usuario con ese correo electrónico y número telefónico.');
        }
        user.name = updateUserDto.name;
        user.surname = updateUserDto.surname;
        if (updateUserDto.password) {
            user.password = bcrypt.hashSync(updateUserDto.password, 10);
        }
        user.email = updateUserDto.email;
        user.status = updateUserDto.status;
        user.devices = updateUserDto.devices;
        user.roles = updateUserDto.roles;
        user.birthday = updateUserDto.birthday;
        user.gender = updateUserDto.gender;
        user.image = updateUserDto.image;
        return await user.save();
    }
    async updateStatus(user, status) {
        user.status = status;
        return await user.save();
    }
    async updateImage(user, image) {
        user.image = image;
        return await user.save();
    }
    async updatePassword(user, updatePasswordUserDto) {
        const validSign = await bcrypt.compare(updatePasswordUserDto.oldPassword, user.password);
        if (!validSign) {
            throw new common_1.ConflictException('La contraseña previa no coincide');
        }
        user.password = bcrypt.hashSync(updatePasswordUserDto.newPassword, 10);
        return user.save();
    }
    async recoveryPassword(updateUser) {
        const user = await this.findOne({ _id: updateUser.id });
        user.password = bcrypt.hashSync(updateUser.password, 10);
        return await user.save();
    }
    async existingEmail(email) {
        return this.User.findOne({ email: email });
    }
    getSafeParameters(user) {
        return Object.assign(Object.assign({}, user.toObject()), { devices: undefined, password: undefined, roles: undefined, created_at: undefined, updated_at: undefined, deleted_at: undefined });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mailerService_1.MailerAwsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map