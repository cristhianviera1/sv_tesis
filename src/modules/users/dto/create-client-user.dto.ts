import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import CreateUserDto, { UserGender, UserType } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

export class CreateClientUserDto extends CreateUserDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  surname: string;

  @ApiProperty()
  @IsString({ message: 'La contraseña es requerida' })
  @MaxLength(20, {
    message: 'La contraseña debe tener un maximo de 20 caracteres',
  })
  @MinLength(8, {
    message: 'La contraseña debe tener un mínimo de 8 caracteres',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @ApiProperty()
  @IsPhoneNumber('EC', { message: 'El número celular es inválido' })
  @IsNotEmpty({ message: 'El número celular es requerido' })
  phone: string;

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
  @IsNotEmpty({ message: 'El género es obligatorio' })
  gender: UserGender;

  @ApiProperty()
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  birthday: number;

  constructor(name: string, surname: string, phone: string, email: string, roles: UserType, gender: UserGender, password: string, status: boolean, birthday: number) {
    super(name, surname, phone, email, roles, gender, password);
    this.name = name;
    this.surname = surname;
    if (password) {
      this.password = bcrypt.hashSync(password, 10);
    }
    this.phone = phone;
    this.email = email;
    this.status = status;
    this.roles = roles;
    this.gender = gender;
    this.birthday = birthday;
  }
}
