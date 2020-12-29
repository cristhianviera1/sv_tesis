import { User } from '../../users/schemas/user.schema';
import { ProductDetail, StatusOrder, VoucherDetail } from '../schema/shopping-cart.schema';
import { v4 as uuid4 } from 'uuid';

export class CreateShoppingCartDto {
  _id: string;
  user: User;
  products: ProductDetail[];
  status: StatusOrder[];
  voucher: VoucherDetail;
  total: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;

  constructor(user: User, products: ProductDetail[], status: StatusOrder, voucher: VoucherDetail, total: number) {
    this._id = uuid4();
    this.user = user;
    this.products = products;
    this.status = [status];
    this.voucher = voucher;
    this.total = total;
  }
}
