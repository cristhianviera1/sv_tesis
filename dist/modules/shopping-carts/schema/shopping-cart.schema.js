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
exports.generateStatusOrderModel = exports.StatusVoucherEnum = exports.StatusTypeOrderEnum = exports.ShoppingCartSchema = exports.ShoppingCart = void 0;
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const generateUnixTimestamp_1 = require("../../../utils/generateUnixTimestamp");
const uuid_1 = require("uuid");
const user_schema_1 = require("../../users/schemas/user.schema");
let ShoppingCart = class ShoppingCart extends mongoose_1.Document {
};
__decorate([
    mongoose_2.Prop({ default: () => uuid_1.v4() }),
    __metadata("design:type", String)
], ShoppingCart.prototype, "_id", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", user_schema_1.User)
], ShoppingCart.prototype, "user", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", Array)
], ShoppingCart.prototype, "products", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", Array)
], ShoppingCart.prototype, "status", void 0);
__decorate([
    mongoose_2.Prop({ type: mongoose.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], ShoppingCart.prototype, "voucher", void 0);
__decorate([
    mongoose_2.Prop({ required: true }),
    __metadata("design:type", Number)
], ShoppingCart.prototype, "total", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], ShoppingCart.prototype, "created_at", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
        default: generateUnixTimestamp_1.generateUnixTimestamp,
    }),
    __metadata("design:type", Number)
], ShoppingCart.prototype, "updated_at", void 0);
__decorate([
    mongoose_2.Prop({
        type: 'number',
    }),
    __metadata("design:type", Number)
], ShoppingCart.prototype, "deleted_at", void 0);
ShoppingCart = __decorate([
    mongoose_2.Schema()
], ShoppingCart);
exports.ShoppingCart = ShoppingCart;
exports.ShoppingCartSchema = mongoose_2.SchemaFactory.createForClass(ShoppingCart);
var StatusTypeOrderEnum;
(function (StatusTypeOrderEnum) {
    StatusTypeOrderEnum["WAITING_CONTACT"] = "esperando contacto";
    StatusTypeOrderEnum["IN_CONTACT"] = "en contacto";
    StatusTypeOrderEnum["DELIVERY_PENDING"] = "pendiente entrega";
    StatusTypeOrderEnum["DELIVERED"] = "entregado";
    StatusTypeOrderEnum["CANCELED"] = "anulado";
})(StatusTypeOrderEnum = exports.StatusTypeOrderEnum || (exports.StatusTypeOrderEnum = {}));
var StatusVoucherEnum;
(function (StatusVoucherEnum) {
    StatusVoucherEnum["WAIGTING_VAUCHER"] = "pendiente comprobante";
    StatusVoucherEnum["WAITING_APROVAL"] = "pendiente aprobaci\u00F3n";
    StatusVoucherEnum["APPROVED"] = "aprobado";
    StatusVoucherEnum["DENIED"] = "denegado";
})(StatusVoucherEnum = exports.StatusVoucherEnum || (exports.StatusVoucherEnum = {}));
exports.generateStatusOrderModel = (status, timestamp, comments = undefined) => ({
    status,
    timestamp,
    comments,
});
//# sourceMappingURL=shopping-cart.schema.js.map