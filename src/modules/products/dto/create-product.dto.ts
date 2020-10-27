import { IsNotEmpty } from 'class-validator';
import { Category } from '../product.model';

export default class CreateProductDto {
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
}
