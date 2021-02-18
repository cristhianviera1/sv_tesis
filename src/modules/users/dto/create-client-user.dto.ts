import { IsEmail, IsNotEmpty } from 'class-validator';
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
  @IsEmail(undefined, {
    message: 'El correo electrónico es inválido',
  })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  @ApiProperty()
  gender?: UserGender;

  status?: boolean;

  @ApiProperty()
  device?: string;

  @ApiProperty()
  roles: UserType;

  @ApiProperty()
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  birthday: number;

  constructor(
    name: string,
    surname: string,
    email: string,
    roles: UserType,
    password: string,
    status: boolean,
    birthday: number,
    gender: UserGender,
  ) {
    super(name, surname, email, birthday, roles, password);
    this.name = name;
    this.surname = surname;
    if (password) {
      this.password = bcrypt.hashSync(password, 10);
    }
    this.email = email;
    this.status = status;
    this.roles = roles;
    this.gender = gender;
  }
}
