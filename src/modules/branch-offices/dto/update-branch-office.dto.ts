import { IsEmail, IsNotEmpty } from 'class-validator';
import { Address } from '../../addresses/address.model';

export default class UpdateBranchOfficeDto{
  @IsNotEmpty()
  _id:string

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  address: Address;
}