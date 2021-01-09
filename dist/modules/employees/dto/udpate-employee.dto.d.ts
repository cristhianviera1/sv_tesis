import { UserGender } from '../../users/dto/create-user.dto';
export default class UpdateEmployeeDto {
    _id: string;
    dni: string;
    name: string;
    gender: UserGender;
    phone: string;
    email: string;
    constructor(dni: string, name: string, phone: string, email: string);
}
