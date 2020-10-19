import { IsNotEmpty } from 'class-validator';

export default class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  stock: number;

  category: string[];

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  detail: string;

  @IsNotEmpty()
  image: string;
}