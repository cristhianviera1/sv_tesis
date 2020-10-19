import { IsNotEmpty } from 'class-validator';

export default class UpdateNewnessDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty({ message: 'El campo título es requerido' })
  title: string;

  @IsNotEmpty({ message: 'El campo descripción es requerido' })
  description: string;

  image?: string;

  created_at: number;

  updated_at: number;

  deleted_at: number;
}