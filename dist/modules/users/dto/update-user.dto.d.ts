import { UserGender, UserType } from './create-user.dto';
export declare class UpdateUserDto {
    id: string;
    name: string;
    surname: string;
    password?: string;
    phone: string;
    email: string;
    status?: boolean;
    devices?: string[];
    roles: UserType;
    birthday: number;
    gender?: UserGender;
    image?: string;
}
