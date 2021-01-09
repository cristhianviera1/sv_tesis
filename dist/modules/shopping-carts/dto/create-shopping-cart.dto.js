"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShoppingCartDto = void 0;
const uuid_1 = require("uuid");
class CreateShoppingCartDto {
    constructor(user, products, status, voucher, total) {
        this._id = uuid_1.v4();
        this.user = user;
        this.products = products;
        this.status = [status];
        this.voucher = voucher;
        this.total = total;
    }
}
exports.CreateShoppingCartDto = CreateShoppingCartDto;
//# sourceMappingURL=create-shopping-cart.dto.js.map