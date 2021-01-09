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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const nest_access_control_1 = require("nest-access-control");
const users_service_1 = require("../users/users.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const rooms_service_1 = require("../rooms/rooms.service");
let ChatsController = class ChatsController {
    constructor(chatsService, usersService, roomsService) {
        this.chatsService = chatsService;
        this.usersService = usersService;
        this.roomsService = roomsService;
    }
    async list(query, req) {
        var _a;
        console.log(req === null || req === void 0 ? void 0 : req.user, query, 'CHAT');
        const userFrom = await this.usersService.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
        const toUser = await this.usersService.findOne({ _id: query === null || query === void 0 ? void 0 : query.toUser });
        if (!userFrom || !toUser) {
            throw new common_1.NotFoundException('No se ha encontrado al usuario');
        }
        return this.chatsService.history(userFrom, toUser, query === null || query === void 0 ? void 0 : query.limit);
    }
    async users(query, req) {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user.roles === create_user_dto_1.UserTypeEnum.BRIGADISTA) {
            const roomsCreated = await this.roomsService.list({ $or: [{ fromUser: user._id }, { toUser: user._id }] });
            const idOfUsersChats = roomsCreated.map((room) => room.fromUser === user._id ? room.toUser : room.fromUser);
            const users = await this.usersService.list({ _id: { $in: [...idOfUsersChats] } });
            return users.map((user) => this.usersService.getSafeParameters(user));
        }
        const brigadiers = await this.usersService.list({
            roles: 'brigadista',
            deleted_at: null,
            _id: { $ne: user._id },
        }, req === null || req === void 0 ? void 0 : req.start, req === null || req === void 0 ? void 0 : req.items);
        return brigadiers.map((user) => this.usersService.getSafeParameters(user));
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'chat',
        action: 'read',
        possession: 'own',
    }),
    common_1.Get(),
    __param(0, common_1.Query()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "list", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'chat',
        action: 'read',
        possession: 'own',
    }),
    common_1.Get('/users'),
    __param(0, common_1.Query()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "users", null);
ChatsController = __decorate([
    common_1.Controller('chats'),
    __metadata("design:paramtypes", [chats_service_1.ChatsService,
        users_service_1.UsersService,
        rooms_service_1.RoomsService])
], ChatsController);
exports.ChatsController = ChatsController;
//# sourceMappingURL=chats.controller.js.map