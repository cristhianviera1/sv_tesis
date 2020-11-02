import { IsNotEmpty } from 'class-validator';
import { Category } from '../schema/product.schema';
import { v4 as uuid4 } from 'uuid';

export default class CreateProductDto {
  _id: string;
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  stock: number;

  category: Category[];

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  detail: string;

  @IsNotEmpty()
  image: string;

  status: boolean;

  created_at: number;
  updated_at: number;
  deleted_at: number;

  constructor(title: string, stock: number, category: Category[], price: number, detail: string, image: string) {
    this._id = uuid4();
    this.title = title;
    this.stock = stock;
    this.category = category;
    this.price = price;
    this.detail = detail;
    this.image = image;
  }
}
