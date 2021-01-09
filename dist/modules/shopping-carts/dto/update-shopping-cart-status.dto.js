"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rulesToUpdate = void 0;
const shopping_cart_schema_1 = require("../schema/shopping-cart.schema");
class UpdateShoppingCartStatusDto {
}
exports.default = UpdateShoppingCartStatusDto;
exports.rulesToUpdate = {
    'en contacto': [
        shopping_cart_schema_1.StatusTypeOrderEnum.WAITING_CONTACT,
    ],
    'pendiente entrega': [
        shopping_cart_schema_1.StatusTypeOrderEnum.IN_CONTACT,
    ],
    'entregado': [
        shopping_cart_schema_1.StatusTypeOrderEnum.DELIVERY_PENDING,
    ],
};
//# sourceMappingURL=update-shopping-cart-status.dto.js.map