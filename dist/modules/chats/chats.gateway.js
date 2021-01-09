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
exports.ChatsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("../rooms/rooms.service");
const users_service_1 = require("../users/users.service");
const chats_service_1 = require("./chats.service");
const create_chat_dto_1 = __importDefault(require("./dto/create-chat.dto"));
let ChatsGateway = class ChatsGateway {
    constructor(roomsService, usersService, chatsService) {
        this.roomsService = roomsService;
        this.usersService = usersService;
        this.chatsService = chatsService;
        this.logger = new common_1.Logger('AppGateway');
    }
    async handleMessage(client, data) {
        const userFrom = await this.usersService.findOne({ _id: data.userFrom });
        const toUser = await this.usersService.findOne({ _id: data.toUser });
        if (!userFrom || !toUser) {
            throw new common_1.NotFoundException('No se ha encontrado el usuario específicado');
        }
        const room = await this.roomsService.findWithUsers(userFrom, toUser);
        const chat = new create_chat_dto_1.default(userFrom._id, toUser._id, data.message);
        await this.chatsService.create(chat);
        this.server.to(room._id).emit('msgFromServer', chat);
    }
    async handleJoinRoom(client, data) {
        const userFrom = await this.usersService.findOne({ _id: data.userFrom });
        const toUser = await this.usersService.findOne({ _id: data.toUser });
        if (!userFrom || !toUser) {
            throw new common_1.NotFoundException('No se ha encontrado el usuario específicado');
        }
        const room = await this.roomsService.findWithUsers(userFrom, toUser);
        if (!room) {
            const newRoom = await this.roomsService.create(userFrom, toUser);
            return client.join(newRoom._id);
        }
        return client.join(room._id);
    }
    afterInit() {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChatsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('msgToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleJoinRoom", null);
ChatsGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        users_service_1.UsersService,
        chats_service_1.ChatsService])
], ChatsGateway);
exports.ChatsGateway = ChatsGateway;
//# sourceMappingURL=chats.gateway.js.map