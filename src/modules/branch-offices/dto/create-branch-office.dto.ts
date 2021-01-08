import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { Address } from '../../addresses/address.model';

export default class CreateBranchOfficeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  address: Address;

  @IsNotEmpty()
  first_address: string;

  second_address?: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsLatitude({ message: 'La latitud es inválida' })
  latitude: string;

  @IsNotEmpty()
  @IsLongitude({ message: 'La longitud es inválida' })
  longitude: string;

  created_at: string;

  updated_at: string;

  deleted_at: string;


  constructor(name: string, email: string, address: Address) {
    this.name = name;
    this.email = email;
    this.address = address;
  }
}
