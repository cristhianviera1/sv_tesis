import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { v4 as uuid4 } from 'uuid';

export default class UpdateEmployeeDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('EC', { message: 'El numero celular es invalido' })
  phone: string;

  @IsNotEmpty()
  @IsEmail(undefined, {
    message: 'El correo electrónico es invalido',
  })
  email: string;


  constructor(dni: string, name: string, phone: string, email: string) {
    this.dni = dni;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this._id = uuid4();
  }
}
