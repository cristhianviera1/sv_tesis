import { RolesBuilder } from 'nest-access-control';
import { UserTypeEnum } from '../modules/users/dto/create-user.dto';

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserTypeEnum.ADMIN)
  .createAny(['users'])
  .deleteAny(['users'])
  .readAny(['users'])
  .updateAny(['users'])

  .grant(UserTypeEnum.BRANCH_ADMIN)
  .updateOwn(['users'])
  .readOwn(['users'])
  .deleteOwn(['users'])

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
