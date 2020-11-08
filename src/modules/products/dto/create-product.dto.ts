import { IsNotEmpty } from 'class-validator';
import { v4 as uuid4 } from 'uuid';
import { Category } from '../schema/product.schema';

export default class CreateProductDto {
  _id: string;

  @IsNotEmpty({ message: 'El campo nombre es requerido' })
  name: string;

  @IsNotEmpty({ message: 'El campo stock es requerido' })
  stock: number;

  status: boolean;

  category: Category[];

  @IsNotEmpty({ message: 'El campo precio es requerido' })
  price: number;

  @IsNotEmpty({ message: 'El campo detalle es requerido' })
  detail: string;

  @IsNotEmpty({ message: 'El campo imagen es requerido' })
  image: string;

  created_at: number;
  updated_at: number;
  deleted_at: number;

  constructor(name: string, stock: number, category: Category[], price: number, detail: string, image: string) {
    this._id = uuid4();
    this.name = name;
    this.stock = stock;
    this.category = category;
    this.price = price;
    this.detail = detail;
    this.image = image;
  }
}
