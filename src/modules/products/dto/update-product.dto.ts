import { IsNotEmpty } from 'class-validator';

export default class UpdateProductDto{
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  detail: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  status: boolean;
}
