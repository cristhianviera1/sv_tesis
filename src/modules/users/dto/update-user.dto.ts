import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { UserGender, UserType } from './create-user.dto';

export default class UpdateUserDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('EC')
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  roles: UserType;

  @IsNotEmpty()
  gender: UserGender;

  @IsNotEmpty()
  birthday: number;


  constructor(dni: string, name: string, surname: string, password: string, phone: string, email: string, status: boolean, roles: UserType, gender: UserGender, birthday: number) {
    this.dni = dni;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.phone = phone;
    this.email = email;
    this.status = status;
    this.roles = roles;
    this.gender = gender;
    this.birthday = birthday;
  }
}
