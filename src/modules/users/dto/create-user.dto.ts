import { v4 as uuid4 } from 'uuid';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import passport from 'passport';

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
  @IsPhoneNumber('EC', { message: 'El numero celular es invalido' })
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail(undefined, {
    message: 'El correo electrónico es invalido',
  })
  email: string;

  status?: boolean;
  devices?: string[];
  roles: UserType;

  @IsNotEmpty()
  @ApiProperty()
  gender: UserGender;

  constructor(name: string, surname: string, phone: string, email: string, roles: UserType, gender: UserGender, password: string) {
    this._id = uuid4();
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.roles = roles;
    this.gender = gender;
    this.password = password;
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
