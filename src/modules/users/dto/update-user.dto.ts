import { UserGender, UserType } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'El campo id es requerido' })
  _id: string;

  @IsNotEmpty({ message: 'El campo nombre es requerido' })
  name: string;

  @IsNotEmpty({ message: 'El campo apellido es requerido' })
  surname: string;

  password?: string;

  @IsNotEmpty({ message: 'El campo teléfono es requerido' })
  phone: string;

  @IsNotEmpty({ message: 'El campo correo electrónico es requerido' })
  email: string;

  @IsNotEmpty({ message: 'El campo estado es requerido' })
  status?: boolean;

  devices?: string[];

  @IsNotEmpty({ message: 'El campo rol es requerido' })
  roles: UserType;

  gender?: UserGender;
}
