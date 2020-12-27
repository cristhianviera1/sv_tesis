import { IsLatitude, IsLongitude } from 'class-validator';

export class Address {
  _id: string;
  first_address: string;
  second_address?: string;
  country: string;
  state: string;
  city: string;
  @IsLatitude({ message: 'La latitud es inválida' })
  latitude: string;
  @IsLongitude({ message: 'La longitud es inválida' })
  longitude: string;
}
