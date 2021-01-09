import { StatusOrder } from '../schema/shopping-cart.schema';
import { User } from '../../users/schemas/user.schema';
interface ProductDetail {
    productID: string;
    quantity: number;
}
export default class CreateShoppingCartRequestDto {
    _id: string;
    user: User;
    products: ProductDetail[];
    status: StatusOrder;
    voucher_image: string;
    total: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    constructor(user: User, products: ProductDetail[], status: StatusOrder, voucher_image: string);
}
export {};
