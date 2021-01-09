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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chat_schema_1 = require("./schema/chat.schema");
const mongoose_2 = require("mongoose");
const create_chat_dto_1 = __importDefault(require("./dto/create-chat.dto"));
let ChatsService = class ChatsService {
    constructor(ChatModel) {
        this.ChatModel = ChatModel;
    }
    async create(createChatDto) {
        const newChat = new create_chat_dto_1.default(createChatDto.fromUser, createChatDto.toUser, createChatDto.message);
        const savedChat = await this.ChatModel.create(newChat);
        return savedChat.save();
    }
    async history(fromUser, toUser, limit = 30) {
        const chats = await this.ChatModel.find({
            $or: [
                { fromUser: fromUser._id, toUser: toUser._id },
                { fromUser: toUser._id, toUser: fromUser._id },
            ],
            deleted_at: null,
        }).limit(limit);
        if (!chats) {
            throw new common_1.NotFoundException('Aún no tienes chats');
        }
        return chats;
    }
};
ChatsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map