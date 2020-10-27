import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { CreateUserDto, UserGender, UserType } from '../../users/dto/create-user.dto';

export default class CreateEmployeeUserDto implements CreateUserDto {

  _id: string;

  branch_office_id?: string;

  @ApiProperty()
  @IsNotEmpty()
  dni: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  gender: UserGender;

  @ApiProperty()
  @IsPhoneNumber('EC', { message: 'El numero celular es invalido' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEmail(undefined, {
    message: 'El correo electrónico es invalido',
  })
  @IsNotEmpty()
  email: string;

  status?: boolean;

  @ApiProperty()
  device?: string;

  roles: UserType;

  created_at: number;
  updated_at: number;
  deleted_at: number;


  constructor(dni: string, name: string, surname: string, gender: UserGender, password: string, phone: string, email: string, status: boolean, roles: UserType, created_at: number, updated_at: number, deleted_at?: number, device?: string) {
    this._id = uuid4();
    this.dni = dni;
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    if (password) {
      this.password = bcrypt.hashSync(password, 10);
    }
    this.phone = phone;
    this.email = email;
    this.status = status;
    this.device = device;
    this.roles = roles;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
