import CreateUserDto, { UserGender, UserType } from './create-user.dto';
export declare class CreateClientUserDto extends CreateUserDto {
    name: string;
    surname: string;
    email: string;
    gender?: UserGender;
    status?: boolean;
    device?: string;
    roles: UserType;
    birthday: number;
    constructor(name: string, surname: string, email: string, roles: UserType, password: string, status: boolean, birthday: number, gender: UserGender);
}
