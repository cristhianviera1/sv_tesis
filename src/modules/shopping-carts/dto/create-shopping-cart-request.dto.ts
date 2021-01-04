import { IsNotEmpty } from 'class-validator';
import { v4 as uuid4 } from 'uuid';
import { StatusOrder } from '../schema/shopping-cart.schema';
import { User } from '../../users/schemas/user.schema';

interface ProductDetail {
  productID: string,
  quantity: number
}

export default class CreateShoppingCartRequestDto {
  _id: string;
  user: User;
  @IsNotEmpty({ message: 'El detalle de los productos son requeridos' })
  products: ProductDetail[];
  status: StatusOrder;
  voucher_image: string;
  total: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;

  constructor(user: User, products: ProductDetail[], status: StatusOrder, voucher_image: string) {
    this._id = uuid4();
    this.user = user;
    this.products = products;
    this.status = status;
    this.voucher_image = voucher_image;
  }
}
