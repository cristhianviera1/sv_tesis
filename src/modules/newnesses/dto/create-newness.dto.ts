import { IsNotEmpty } from 'class-validator';
import { v4 as uuid4 } from 'uuid';

export default class CreateNewnessDto {
  _id: string;

  @IsNotEmpty({ message: 'El campo título es requerido' })
  title: string;

  @IsNotEmpty({ message: 'El campo descripción es requerido' })
  description: string;

  @IsNotEmpty()
  image: string;

  created_at: number;

  updated_at: number;

  deleted_at: number;

  constructor(title: string, description: string, image: string) {
    this._id = uuid4();
    this.title = title;
    this.description = description;
    this.image = image;
  }
}
