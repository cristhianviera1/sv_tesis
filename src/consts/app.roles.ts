import { RolesBuilder } from 'nest-access-control';
import { UserTypeEnum } from '../modules/users/dto/create-user.dto';

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserTypeEnum.ADMIN)
  .createAny(['users', 'branchOffices', 'employees', 'newness', 'products', 'shopping-carts'])
  .deleteAny(['users', 'branchOffices', 'employees', 'newness', 'products', 'shopping-carts'])
  .readAny(['users', 'branchOffices', 'employees', 'newness', 'products', 'shopping-carts'])
  .updateAny(['users', 'branchOffices', 'employees', 'newness', 'products', 'shopping-carts'])

  .grant(UserTypeEnum.BRANCH_ADMIN)
  .updateOwn(['users', 'branchOffices'])
  .readOwn(['users', 'branchOffices'])
  .updateAny(['products', 'shopping-carts'])
  .readAny(['products', 'shopping-carts'])
  .deleteAny(['products', 'shopping-carts'])
  .deleteOwn(['users', 'branchOffices'])

  .grant(UserTypeEnum.BRIGADISTA)
  .createOwn(['users'])
  .updateOwn(['users'])
  .readOwn(['users'])
  .readAny(['products'])
  .deleteOwn(['users'])

  .grant(UserTypeEnum.CLIENT)
  .createOwn(['users', 'shopping-carts'])
  .deleteOwn(['users', 'shopping-carts'])
  .readOwn(['users', 'shopping-carts'])
  .readAny(['products', 'newness'])
  .updateOwn(['users', 'shopping-carts'])
;
