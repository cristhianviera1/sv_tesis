import { User } from '../../users/schemas/user.schema';
import { ProductDetail, StatusOrder, VoucherDetail } from '../schema/shopping-cart.schema';
export declare class CreateShoppingCartDto {
    _id: string;
    user: User;
    products: ProductDetail[];
    status: StatusOrder[];
    voucher: VoucherDetail;
    total: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    constructor(user: User, products: ProductDetail[], status: StatusOrder, voucher: VoucherDetail, total: number);
}
