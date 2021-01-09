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
exports.ShoppingCartsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const shopping_cart_schema_1 = require("./schema/shopping-cart.schema");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
const generateUnixTimestamp_1 = require("../../utils/generateUnixTimestamp");
const create_shopping_cart_dto_1 = require("./dto/create-shopping-cart.dto");
let ShoppingCartsService = class ShoppingCartsService {
    constructor(ShoppingCartModel, usersService, productsService) {
        this.ShoppingCartModel = ShoppingCartModel;
        this.usersService = usersService;
        this.productsService = productsService;
    }
    list(conditions) {
        return this.ShoppingCartModel.find(conditions);
    }
    findOne(conditions) {
        return this.ShoppingCartModel.findOne(conditions);
    }
    async findById(id) {
        const shoppingCart = this.findOne({ _id: id });
        if (!shoppingCart) {
            throw new common_1.NotFoundException('No se ha encontrado el carrito con el id proporcionado');
        }
        return shoppingCart;
    }
    async create(createShoppingCartDto, user) {
        let total = 0;
        const productsDetail = [];
        for (let i = 0; i < createShoppingCartDto.products.length; i++) {
            const productDetail = createShoppingCartDto.products[i];
            const productEntity = await this.productsService.findById(productDetail.productID);
            productsDetail.push({
                product: this.productsService.getSafeParameters(productEntity),
                quantity: productDetail.quantity,
            });
            total += (productEntity.price * productDetail.quantity);
        }
        const newShoppingCart = new create_shopping_cart_dto_1.CreateShoppingCartDto(this.usersService.getSafeParameters(user), productsDetail, shopping_cart_schema_1.generateStatusOrderModel(shopping_cart_schema_1.StatusTypeOrderEnum.WAITING_CONTACT, generateUnixTimestamp_1.generateUnixTimestamp()), {
            statuses: [{
                    created_at: generateUnixTimestamp_1.generateUnixTimestamp(),
                    status: shopping_cart_schema_1.StatusVoucherEnum.WAIGTING_VAUCHER,
                }],
        }, total);
        return await this.ShoppingCartModel.create(newShoppingCart);
    }
    async uploadVoucherImage(image, shoppingCart) {
        shoppingCart.voucher.image = image;
        shoppingCart.markModified('voucher');
        return await shoppingCart.save();
    }
    async updateStatus(changedBy, cart_id, updateShoppingCartStatus) {
        const order = await this.findOne({
            _id: cart_id,
            'status.status': { $nin: [shopping_cart_schema_1.StatusTypeOrderEnum.DELIVERED, shopping_cart_schema_1.StatusTypeOrderEnum.CANCELED] },
            deleted_at: null,
        });
        if (!order.voucher.statuses.some((status) => status.status === shopping_cart_schema_1.StatusVoucherEnum.APPROVED)) {
            throw new common_1.ConflictException('No se puede actualizar el estado de entrega hasta que el comprobante del depósito haya sido verificado');
        }
        order.status.push(shopping_cart_schema_1.generateStatusOrderModel(updateShoppingCartStatus.status, generateUnixTimestamp_1.generateUnixTimestamp(), `La transacción fue actualizada por: ${changedBy.name} ${changedBy.surname}. con email: ${changedBy.email}`));
        if (updateShoppingCartStatus.status === shopping_cart_schema_1.StatusTypeOrderEnum.CANCELED) {
            order.deleted_at = generateUnixTimestamp_1.generateUnixTimestamp();
        }
        order.markModified('status');
        return await order.save();
    }
    async updateVoucherStatus(changedBy, shoppingCart, updateVoucherStatusDto) {
        const canUpdate = !shoppingCart.voucher.statuses.some((status) => status.status === shopping_cart_schema_1.StatusVoucherEnum.DENIED || status.status === shopping_cart_schema_1.StatusVoucherEnum.APPROVED);
        if (canUpdate) {
            throw new common_1.ConflictException(`El comprobante de pago ya ha sido ${updateVoucherStatusDto.status}`);
        }
        shoppingCart.voucher.statuses.push({
            status: updateVoucherStatusDto.status,
            description: `Actualizado por: ${changedBy.name} ${changedBy.surname}, con email: ${changedBy.email}`,
            created_at: generateUnixTimestamp_1.generateUnixTimestamp(),
        });
        shoppingCart.markModified('voucher');
        return await shoppingCart.save();
    }
    async updateDeliveryStatus(changedBy, shoppingCart, updateVoucherStatusDto) {
        const canUpdate = shoppingCart.voucher.statuses[shoppingCart.voucher.statuses.length - 1].status == shopping_cart_schema_1.StatusVoucherEnum.APPROVED;
        if (!canUpdate) {
            throw new common_1.ConflictException(`El estado de la entrega no se puede actualizar si el comprobante de pago no ha sido aprobado, o la orden ya ha sido entregada | anulada `);
        }
        shoppingCart.status.push(Object.assign({}, shopping_cart_schema_1.generateStatusOrderModel(updateVoucherStatusDto.delivery_status, generateUnixTimestamp_1.generateUnixTimestamp(), `Actualizado por ${changedBy.name} ${changedBy.surname} con email: ${changedBy.email}`)));
        shoppingCart.markModified('status');
        return await shoppingCart.save();
    }
};
ShoppingCartsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(shopping_cart_schema_1.ShoppingCart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        products_service_1.ProductsService])
], ShoppingCartsService);
exports.ShoppingCartsService = ShoppingCartsService;
//# sourceMappingURL=shopping-carts.service.js.map