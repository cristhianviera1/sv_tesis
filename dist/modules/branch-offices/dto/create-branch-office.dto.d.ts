import { Address } from '../../addresses/address.model';
export default class CreateBranchOfficeDto {
    name: string;
    email: string;
    address: Address;
    first_address: string;
    second_address?: string;
    country: string;
    state: string;
    city: string;
    latitude: string;
    longitude: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    constructor(name: string, email: string, address: Address);
}
