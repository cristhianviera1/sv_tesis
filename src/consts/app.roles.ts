import { RolesBuilder } from 'nest-access-control';
import { UserTypeEnum } from '../modules/users/dto/create-user.dto';

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserTypeEnum.ADMIN)
  .createAny(['users', 'branchOffices', 'employees', 'newness'])
  .deleteAny(['users', 'branchOffices', 'employees', 'newness'])
  .readAny(['users', 'branchOffices', 'employees', 'newness'])
  .updateAny(['users', 'branchOffices', 'employees', 'newness'])

  .grant(UserTypeEnum.BRANCH_ADMIN)
  .updateOwn(['users','branchOffices','products'])
  .readOwn(['users','branchOffices','products'])
  .deleteOwn(['users','branchOffices','products'])

  .grant(UserTypeEnum.BRIGADISTA)
  .createOwn(['users'])
  .updateOwn(['users'])
  .readOwn(['users'])
  .deleteOwn(['users'])

  .grant(UserTypeEnum.CLIENT)
  .createOwn(['users'])
  .deleteOwn(['users'])
  .readOwn(['users'])
  .updateOwn(['users'])
;
