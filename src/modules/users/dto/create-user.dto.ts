import { v4 as uuid4 } from 'uuid';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
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

  status?: boolean;
  devices?: string[];
  roles: UserType;

  @ApiProperty()
  @IsOptional()
  gender?: UserGender;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('EC', { message: 'El numero celular es invalido' })
  phone?: string;

  constructor(name: string, surname: string, email: string, roles: UserType, password: string, gender?: UserGender, phone?: string) {
    this._id = uuid4();
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.roles = roles;
    this.gender = gender;
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
