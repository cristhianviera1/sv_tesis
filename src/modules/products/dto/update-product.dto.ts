import { IsNotEmpty } from 'class-validator';
import { Category } from '../schema/product.schema';

export default class UpdateProductDto{
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  stock: number;

  category: Category[];

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  detail: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  status: boolean;
}
