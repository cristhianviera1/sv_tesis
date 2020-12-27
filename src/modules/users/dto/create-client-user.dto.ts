import { IsEmail, IsNotEmpty } from 'class-validator';
import CreateUserDto, { UserType } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientUserDto extends CreateUserDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  surname: string;

  /*  @ApiProperty()
    @IsString({ message: 'La contraseña es requerida' })
    @MaxLength(20, {
      message: 'La contraseña debe tener un maximo de 20 caracteres',
    })
    @MinLength(8, {
      message: 'La contraseña debe tener un mínimo de 8 caracteres',
    })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;*/

  /*
    @ApiProperty()
    @IsPhoneNumber('EC', { message: 'El número celular es inválido' })
    @IsNotEmpty({ message: 'El número celular es requerido' })
    phone: string;
  */

  @ApiProperty()
  @IsEmail(undefined, {
    message: 'El correo electrónico es inválido',
  })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  status?: boolean;

  @ApiProperty()
  device?: string;

  @ApiProperty()
  roles: UserType;

  @ApiProperty()
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  birthday: number;

  constructor(name: string, surname: string, email: string, roles: UserType, password: string, status: boolean, birthday: number) {
    super(name, surname, email, birthday, roles, password);
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.email = email;
    this.status = status;
    this.roles = roles;
  }
}
