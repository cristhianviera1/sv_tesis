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
exports.ShoppingCartsController = void 0;
const common_1 = require("@nestjs/common");
const shopping_carts_service_1 = require("./shopping-carts.service");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const nest_access_control_1 = require("nest-access-control");
const create_shopping_cart_request_dto_1 = __importDefault(require("./dto/create-shopping-cart-request.dto"));
const users_service_1 = require("../users/users.service");
const update_shopping_cart_status_dto_1 = __importDefault(require("./dto/update-shopping-cart-status.dto"));
const upload_shopping_cart_image_dto_1 = __importDefault(require("./dto/upload-shopping-cart-image.dto"));
const update_voucher_status_dto_1 = __importDefault(require("./dto/update-voucher-status.dto"));
let ShoppingCartsController = class ShoppingCartsController {
    constructor(shoppingCartsService, usersService) {
        this.shoppingCartsService = shoppingCartsService;
        this.usersService = usersService;
    }
    async list() {
        return this.shoppingCartsService.list({});
    }
    myShoppingCart(req) {
        var _a;
        return this.shoppingCartsService.list({ 'user._id': (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    }
    async create(req, cartRequestDto) {
        var _a;
        const user = await this.usersService.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        return await this.shoppingCartsService.create(cartRequestDto, user);
    }
    async updateStatus(req, id, updateShoppingCartStatus) {
        var _a;
        const changedBy = await this.usersService.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        return await this.shoppingCartsService.updateStatus(changedBy, id, updateShoppingCartStatus);
    }
    async find(id) {
        return await this.shoppingCartsService.findById(id);
    }
    async uploadVoucherImage(id, uploadShoppingCartImageDto) {
        const shoppingCart = await this.shoppingCartsService.findById(id);
        return await this.shoppingCartsService.uploadVoucherImage(uploadShoppingCartImageDto.image, shoppingCart);
    }
    async updateVoucherStatus(id, req, updateVoucherStatusDto) {
        var _a;
        const shoppingCart = await this.shoppingCartsService.findById(id);
        const user = await this.usersService.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (updateVoucherStatusDto.delivery_status) {
            return await this.shoppingCartsService.updateDeliveryStatus(user, shoppingCart, updateVoucherStatusDto);
        }
        return await this.shoppingCartsService.updateVoucherStatus(user, shoppingCart, updateVoucherStatusDto);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'shopping-carts',
        action: 'read',
        possession: 'any',
    }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShoppingCartsController.prototype, "list", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'shopping-carts',
        action: 'read',
        possession: 'own',
    }),
    common_1.Get('me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShoppingCartsController.prototype, "myShoppingCart", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'shopping-carts',
        action: 'create',
        possession: 'own',
    }),
    common_1.Post(),
    __param(0, common_1.Request()), __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_shopping_cart_request_dto_1.default]),
    __metadata("design:returntype", Promise)
], ShoppingCartsController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'shopping-carts',
        action: 'update',
        possession: 'any',
    }),
    common_1.Put(':id'),
    __param(0, common_1.Request()), __param(1, common_1.Param('id')), __param(2, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_shopping_cart_status_dto_1.default]),
    __metadata("design:returntype", Promise)
], ShoppingCartsController.prototype, "updateStatus", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'shopping-carts',
        action: 'read',
        possession: 'own',
    }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShoppingCartsController.prototype, "find", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'shopping-carts',
        action: 'update',
        possession: 'own',
    }),
    common_1.Put('upload-voucher/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upload_shopping_cart_image_dto_1.default]),
    __metadata("design:returntype", Promise)
], ShoppingCartsController.prototype, "uploadVoucherImage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'shopping-carts',
        action: 'update',
        possession: 'any',
    }),
    common_1.Put('status/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Request()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_voucher_status_dto_1.default]),
    __metadata("design:returntype", Promise)
], ShoppingCartsController.prototype, "updateVoucherStatus", null);
ShoppingCartsController = __decorate([
    common_1.Controller('shopping-carts'),
    __metadata("design:paramtypes", [shopping_carts_service_1.ShoppingCartsService,
        users_service_1.UsersService])
], ShoppingCartsController);
exports.ShoppingCartsController = ShoppingCartsController;
//# sourceMappingURL=shopping-carts.controller.js.map