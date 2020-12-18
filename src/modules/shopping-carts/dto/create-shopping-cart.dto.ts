import { User } from '../../users/schemas/user.schema';
import { ProductDetail, StatusOrder } from '../schema/shopping-cart.schema';
import { v4 as uuid4 } from 'uuid';

export class CreateShoppingCartDto {
  _id: string;
  user: User;
  products: ProductDetail[];
  status: StatusOrder[];
  total: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;

  constructor(user: User, products: ProductDetail[], status: StatusOrder, total: number) {
    this._id = uuid4();
    this.user = user;
    this.products = products;
    this.status = [status];
    this.total = total;
  }
}