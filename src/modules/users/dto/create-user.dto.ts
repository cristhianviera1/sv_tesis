import { v4 as uuid4 } from 'uuid';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

export default class CreateUserDto {
  _id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es requerido' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellido es requerido' })
  surname: string;

  password: string;


  @IsNotEmpty()
  @ApiProperty()
  @IsEmail(undefined, {
    message: 'El correo electrónico es invalido',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  birthday: number;

  status?: boolean;
  devices?: string[];
  roles: UserType;

  @ApiProperty()
  @IsOptional()
  gender?: UserGender;

  @ApiProperty()
  @IsOptional()
  image?: string;

  constructor(name: string, surname: string, email: string, birthday: number, roles: UserType, password: string, gender?: UserGender, image?: string) {
    this._id = uuid4();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.birthday = birthday;
    this.roles = roles;
    this.gender = gender;
    this.image = image;
    if (password) {
      this.password = bcrypt.hashSync(password, 10);
    }
  }
}

export enum UserTypeEnum {
  ADMIN = 'admin',
  BRANCH_ADMIN = 'branch_admin',
  CLIENT = 'client',
  BRIGADISTA = 'brigadista',
}

export type UserType =
  'admin' |
  'branch_admin' |
  'client' |
  'brigadista';

export enum UserGenderEnum {
  MEN = 'men',
  WOMAN = 'woman',
  OTHER = 'other',
}

export type UserGender =
  'men' |
  'woman' |
  'other';
