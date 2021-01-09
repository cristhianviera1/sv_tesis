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
exports.UserSchema = exports.User = void 0;
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
const generateUnixTimestamp_1 = require("../../../utils/generateUnixTimestamp");
let User = class User extends mongoose_1.Document {
};
__decorate([
    mongoose_2.Prop({ default: () => uuid_1.v4() }),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    mongoose_2.Prop(),
    __metadata("design:type", String)
], User.prototype, "dni", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_2.Prop({ required: true, default: () => false }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    mongoose_2.Prop({ required: false }),
    __metadata("design:type", Array)
], User.prototype, "devices", void 0);
__decorate([
    mongoose_2.Prop({ type: mongoose.Schema.Types.Mixed }),
    __metadata("design:type", String)
], User.prototype, "roles", void 0);
__decorate([
    mongoose_2.Prop({ type: mongoose.Schema.Types.Mixed }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    mongoose_2.Prop(),
    __metadata("design:type", Number)
], User.prototype, "birthday", void 0);
__decorate([
    mongoose_2.Prop(),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], User.prototype, "created_at", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], User.prototype, "updated_at", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
    }),
    __metadata("design:type", Number)
], User.prototype, "deleted_at", void 0);
User = __decorate([
    mongoose_2.Schema()
], User);
exports.User = User;
exports.UserSchema = mongoose_2.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map