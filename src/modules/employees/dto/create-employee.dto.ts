import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import CreateUserDto, { UserGender, UserType } from '../../users/dto/create-user.dto';

export default class CreateEmployeeUserDto extends CreateUserDto {

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

  devices?: string[];

  roles: UserType;

  created_at: number;
  updated_at: number;
  deleted_at: number;
}
