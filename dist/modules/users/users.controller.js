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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const nest_access_control_1 = require("nest-access-control");
const create_user_dto_1 = __importDefault(require("./dto/create-user.dto"));
const update_user_dto_1 = require("./dto/update-user.dto");
const update_image_user_dto_1 = __importDefault(require("./dto/update-image-user.dto"));
const update_password_user_dto_1 = __importDefault(require("./dto/update-password-user.dto"));
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async list(req) {
        const users = await this.usersService.list({ deleted_at: null }, req === null || req === void 0 ? void 0 : req.start, req === null || req === void 0 ? void 0 : req.items);
        return users.map((user) => (Object.assign(Object.assign({}, this.usersService.getSafeParameters(user)), { roles: user.roles })));
    }
    async findOne(id) {
        return this.usersService.findOne({ _id: id });
    }
    async create(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
    async update(updateUserDto) {
        return this.usersService.update(updateUserDto);
    }
    async delete(id) {
        return await this.usersService.delete(id);
    }
    async updateStatus(req) {
        var _a, _b, _c, _d;
        const user = await this.usersService.findById((_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id);
        return await this.usersService.updateStatus(user, (_d = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.status);
    }
    async updateImage(req, updateImageUserDto) {
        var _a;
        const user = await this.usersService.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        return await this.usersService.updateImage(user, updateImageUserDto.image);
    }
    async updatePassword(req, updatePasswordUserDto) {
        var _a;
        const user = await this.usersService.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        return await this.usersService.updatePassword(user, updatePasswordUserDto);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'users',
        action: 'read',
        possession: 'any',
    }),
    common_1.Get(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'users',
        action: 'read',
        possession: 'any',
    }),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'users',
        action: 'create',
        possession: 'any',
    }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.default]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'users',
        action: 'update',
        possession: 'any',
    }),
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'users',
        action: 'update',
        possession: 'any',
    }),
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'users',
        action: 'update',
        possession: 'any',
    }),
    common_1.Put('updateStatus'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateStatus", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'users',
        action: 'update',
        possession: 'own',
    }),
    common_1.Put('updateImage'),
    __param(0, common_1.Request()), __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_image_user_dto_1.default]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateImage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'users',
        action: 'update',
        possession: 'own',
    }),
    common_1.Put('updatePassword'),
    __param(0, common_1.Request()), __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_user_dto_1.default]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map