"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartsModule = void 0;
const common_1 = require("@nestjs/common");
const shopping_carts_controller_1 = require("./shopping-carts.controller");
const shopping_carts_service_1 = require("./shopping-carts.service");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const user_schema_1 = require("../users/schemas/user.schema");
const users_service_1 = require("../users/users.service");
const products_module_1 = require("../products/products.module");
const products_service_1 = require("../products/products.service");
const product_schema_1 = require("../products/schema/product.schema");
const jwt_auth_strategy_1 = require("../../strategies/jwt-auth.strategy");
const shopping_cart_schema_1 = require("./schema/shopping-cart.schema");
const mailerService_1 = require("../../utils/mailerService");
let ShoppingCartsModule = class ShoppingCartsModule {
};
ShoppingCartsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: shopping_cart_schema_1.ShoppingCart.name, schema: shopping_cart_schema_1.ShoppingCartSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
            ]),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
        ],
        providers: [shopping_carts_service_1.ShoppingCartsService, users_service_1.UsersService, products_service_1.ProductsService, jwt_auth_strategy_1.JwtStrategy, mailerService_1.MailerAwsService],
        controllers: [shopping_carts_controller_1.ShoppingCartsController],
    })
], ShoppingCartsModule);
exports.ShoppingCartsModule = ShoppingCartsModule;
//# sourceMappingURL=shopping-carts.module.js.map