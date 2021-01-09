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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.Room = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
const generateUnixTimestamp_1 = require("../../../utils/generateUnixTimestamp");
const mongoose_2 = require("mongoose");
let Room = class Room extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ default: () => uuid_1.v4() }),
    __metadata("design:type", String)
], Room.prototype, "_id", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Room.prototype, "fromUser", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Room.prototype, "toUser", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Room.prototype, "last_message", void 0);
__decorate([
    mongoose_1.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], Room.prototype, "created_at", void 0);
__decorate([
    mongoose_1.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], Room.prototype, "updated_at", void 0);
__decorate([
    mongoose_1.Prop({
        type: 'number',
    }),
    __metadata("design:type", Number)
], Room.prototype, "deleted_at", void 0);
Room = __decorate([
    mongoose_1.Schema()
], Room);
exports.Room = Room;
exports.RoomSchema = mongoose_1.SchemaFactory.createForClass(Room);
//# sourceMappingURL=room.schema.js.map