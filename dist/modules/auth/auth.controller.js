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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const create_client_user_dto_1 = require("../users/dto/create-client-user.dto");
const mailer_message_1 = require("../../consts/mailer-message");
const generatePassword_1 = require("../../utils/generatePassword");
const mailerService_1 = require("../../utils/mailerService");
let AuthController = class AuthController {
    constructor(userService, authService, jwtService, mailerService) {
        this.userService = userService;
        this.authService = authService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async signIn(signInDto) {
        const user = await this.authService.validateSignIn(signInDto.email.toLowerCase(), signInDto.password);
        if (!user) {
            throw new common_1.BadRequestException('Credenciales incorrectas');
        }
        const payload = {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            birthday: user.birthday,
            email: user.email,
            devicesToken: user.devices,
            roles: user.roles,
            status: user.status,
        };
        return {
            accessToken: await this.jwtService.sign(payload),
        };
    }
    async signUp(createClientUserDto) {
        return await this.userService.createClient(createClientUserDto);
    }
    async recoverPass(email) {
        const generatedPassword = generatePassword_1.generateRandomPassword();
        const userEmail = email.toLocaleLowerCase().trim();
        const user = await this.userService.findOne({ email: userEmail });
        this.mailerService.sendMail(userEmail, mailer_message_1.PasswordRecoverSubject, `${mailer_message_1.PassworReceiverdHtml} <br/><p>${mailer_message_1.PasswordBody(generatedPassword)}</p>`);
        user.password = generatedPassword;
        return true;
    }
    async getMe(req) {
        var _a;
        const user = await this.userService.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        return this.userService.getSafeParameters(user);
    }
};
__decorate([
    common_1.Post('sign-in'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    swagger_1.ApiProperty({ description: 'Registro solo para usuarios' }),
    common_1.Post('register'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_user_dto_1.CreateClientUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    swagger_1.ApiProperty(),
    common_1.Get('recover/:email'),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recoverPass", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        jwt_1.JwtService,
        mailerService_1.MailerAwsService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map