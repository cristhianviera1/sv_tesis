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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const room_schema_1 = require("./schema/room.schema");
const mongoose_2 = require("mongoose");
const create_room_dto_1 = __importDefault(require("./dto/create-room.dto"));
const generateUnixTimestamp_1 = require("../../utils/generateUnixTimestamp");
let RoomsService = class RoomsService {
    constructor(RoomModel) {
        this.RoomModel = RoomModel;
    }
    async find(conditions) {
        return this.RoomModel.findOne(Object.assign(Object.assign({}, conditions), { deleted_at: null }));
    }
    async list(conditions) {
        return this.RoomModel.find(conditions);
    }
    findWithUsers(fromUser, toUser) {
        return this.RoomModel.findOne({
            $or: [
                { fromUser: fromUser._id, toUser: toUser._id },
                { fromUser: toUser._id, toUser: fromUser._id },
            ],
            deleted_at: null,
        });
    }
    async create(fromUser, toUser) {
        const newRoom = new create_room_dto_1.default(fromUser._id, toUser._id);
        return await this.RoomModel.create(newRoom);
    }
    async delete(id) {
        const room = await this.find({ _id: id });
        if (!room) {
            throw new common_1.NotFoundException('No se ha encontrado la sala');
        }
        room.deleted_at = generateUnixTimestamp_1.generateUnixTimestamp();
        room.save();
        return true;
    }
};
RoomsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(room_schema_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map