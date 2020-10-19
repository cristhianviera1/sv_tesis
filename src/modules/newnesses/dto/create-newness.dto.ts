import { IsNotEmpty } from 'class-validator';

export default class CreateNewnessDto {
  @IsNotEmpty({ message: 'El campo título es requerido' })
  title: string;

  @IsNotEmpty({ message: 'El campo descripción es requerido' })
  description: string;

  image?: string;

  created_at: number;

  updated_at: number;

  deleted_at: number;

  constructor(title: string, description: string, image: string, created_at: number, updated_at: number, deleted_at: number) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}