export default class CreateUserDto {
    _id: string;
    name: string;
    surname: string;
    password?: string;
    email: string;
    birthday: number;
    status?: boolean;
    devices?: string[];
    roles: UserType;
    gender?: UserGender;
    image?: string;
    constructor(name: string, surname: string, email: string, birthday: number, roles: UserType, password: string, gender?: UserGender, image?: string, status?: boolean);
}
export declare enum UserTypeEnum {
    ADMIN = "admin",
    BRANCH_ADMIN = "branch_admin",
    CLIENT = "client",
    BRIGADISTA = "brigadista"
}
export declare type UserType = 'admin' | 'branch_admin' | 'client' | 'brigadista';
export declare enum UserGenderEnum {
    MEN = "men",
    WOMAN = "woman",
    OTHER = "other"
}
export declare type UserGender = 'men' | 'woman' | 'other';
