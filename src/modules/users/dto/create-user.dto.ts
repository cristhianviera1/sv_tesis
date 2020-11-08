export interface CreateUserDto {
  name: string;
  surname: string;
  password: string;
  phone: string;
  email: string;
  status?: boolean;
  devices?: string;
  roles: UserType;
  gender: UserGender;
}

export enum UserTypeEnum {
  ADMIN = 'admin',
  BRANCH_ADMIN = 'branch_admin',
  CLIENT = 'client',
  BRIGADISTA = 'brigadista',
}

export type UserType =
  'admin' |
  'branch_admin' |
  'client' |
  'brigadista';

export enum UserGenderEnum {
  MEN = 'men',
  WOMAN = 'woman',
  OTHER = 'other',
}

export type UserGender =
  'men' |
  'woman' |
  'other';
