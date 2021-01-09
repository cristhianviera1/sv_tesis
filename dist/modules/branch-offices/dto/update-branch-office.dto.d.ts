export default class UpdateBranchOfficeDto {
    _id: string;
    name: string;
    email: string;
    first_address: string;
    second_address?: string;
    country: string;
    state: string;
    city: string;
    latitude: string;
    longitude: string;
}
