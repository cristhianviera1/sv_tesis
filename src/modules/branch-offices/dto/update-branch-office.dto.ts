import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export default class UpdateBranchOfficeDto{
  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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
}
