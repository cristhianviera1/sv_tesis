import {IsNotEmpty} from 'class-validator';
import {v4 as uuid4} from 'uuid';

export default class CreateProductDto {
  _id: string;

  @IsNotEmpty({message: 'El campo nombre es requerido'})
  name: string;

  @IsNotEmpty({message: 'El campo stock es requerido'})
  stock: number;

  status: boolean;

  @IsNotEmpty({ message: 'El campo precio es requerido' })
  price: number;

  @IsNotEmpty({ message: 'El campo detalle es requerido' })
  detail: string;

  @IsNotEmpty({ message: 'El campo imagen es requerido' })
  image: string;

  created_at: number;
  updated_at: number;
  deleted_at: number;

  constructor(name: string, stock: number, price: number, detail: string, image: string, status: boolean) {
    this._id = uuid4();
    this.name = name;
    this.stock = stock;
    this.price = price;
    this.detail = detail;
    this.image = image;
    this.status = status;
  }
}
