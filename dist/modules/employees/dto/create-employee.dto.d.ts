import CreateUserDto, { UserGender, UserType } from '../../users/dto/create-user.dto';
export default class CreateEmployeeUserDto extends CreateUserDto {
    _id: string;
    branch_office_id?: string;
    dni: string;
    name: string;
    surname: string;
    password: string;
    gender: UserGender;
    phone: string;
    email: string;
    status?: boolean;
    devices?: string[];
    roles: UserType;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}
