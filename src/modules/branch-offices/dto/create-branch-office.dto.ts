import { IsEmail, IsNotEmpty } from 'class-validator';
import { Address } from '../../addresses/address.model';

export default class CreateBranchOfficeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  address: Address;

  created_at: string;

  updated_at: string;

  deleted_at: string;


  constructor(name: string, email: string, address: Address, created_at: string, updated_at: string, deleted_at: string) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}