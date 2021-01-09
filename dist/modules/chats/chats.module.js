"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const chats_controller_1 = require("./chats.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const chat_schema_1 = require("./schema/chat.schema");
const users_module_1 = require("../users/users.module");
const users_service_1 = require("../users/users.service");
const rooms_service_1 = require("../rooms/rooms.service");
const rooms_module_1 = require("../rooms/rooms.module");
const room_schema_1 = require("../rooms/schema/room.schema");
const chats_gateway_1 = require("./chats.gateway");
const mailerService_1 = require("../../utils/mailerService");
let ChatsModule = class ChatsModule {
};
ChatsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Chat', schema: chat_schema_1.ChatSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Room', schema: room_schema_1.RoomSchema },
            ]),
            users_module_1.UsersModule,
            rooms_module_1.RoomsModule,
        ],
        providers: [chats_service_1.ChatsService, users_service_1.UsersService, rooms_service_1.RoomsService, chats_gateway_1.ChatsGateway, mailerService_1.MailerAwsService],
        controllers: [chats_controller_1.ChatsController],
    })
], ChatsModule);
exports.ChatsModule = ChatsModule;
//# sourceMappingURL=chats.module.js.map