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
  .readAny(['products', 'shopping-carts', 'newness'])
  .deleteAny(['products', 'shopping-carts'])
  .deleteOwn(['users', 'branchOffices'])

  .grant(UserTypeEnum.BRIGADISTA)
  .createOwn(['users', 'chat'])
  .updateOwn(['users', 'chat'])
  .readOwn(['users', 'chat'])
  .readAny(['products', 'newness'])
  .deleteOwn(['users', 'chat'])

  .grant(UserTypeEnum.CLIENT)
  .createOwn(['users', 'shopping-carts', 'chat'])
  .deleteOwn(['users', 'shopping-carts', 'chat'])
  .readOwn(['users', 'shopping-carts', 'chat'])
  .readAny(['products', 'newness'])
  .updateOwn(['users', 'shopping-carts', 'chat'])
;
