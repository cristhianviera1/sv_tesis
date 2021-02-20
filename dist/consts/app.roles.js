"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
const nest_access_control_1 = require("nest-access-control");
const create_user_dto_1 = require("../modules/users/dto/create-user.dto");
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles
    .grant(create_user_dto_1.UserTypeEnum.ADMIN)
    .createAny([
    'users',
    'branchOffices',
    'employees',
    'newness',
    'products',
    'shopping-carts',
])
    .deleteAny([
    'users',
    'branchOffices',
    'employees',
    'newness',
    'products',
    'shopping-carts',
])
    .readAny([
    'users',
    'branchOffices',
    'employees',
    'newness',
    'products',
    'shopping-carts',
])
    .updateAny([
    'users',
    'branchOffices',
    'employees',
    'newness',
    'products',
    'shopping-carts',
])
    .grant(create_user_dto_1.UserTypeEnum.BRANCH_ADMIN)
    .updateOwn(['users', 'branchOffices'])
    .readOwn(['users', 'branchOffices'])
    .updateAny(['products', 'shopping-carts'])
    .readAny(['products', 'shopping-carts', 'newness'])
    .deleteAny(['products', 'shopping-carts'])
    .deleteOwn(['users', 'branchOffices'])
    .grant(create_user_dto_1.UserTypeEnum.BRIGADISTA)
    .createOwn(['users', 'chat', 'shopping-carts'])
    .updateOwn(['users', 'chat', 'shopping-carts'])
    .readOwn(['users', 'chat', 'shopping-carts'])
    .readAny(['products', 'newness', 'branchOffices'])
    .deleteOwn(['users', 'chat', 'shopping-carts'])
    .grant(create_user_dto_1.UserTypeEnum.CLIENT)
    .createOwn(['users', 'shopping-carts', 'chat'])
    .deleteOwn(['users', 'shopping-carts', 'chat'])
    .readOwn(['users', 'shopping-carts', 'chat'])
    .readAny(['products', 'newness', 'branchOffices'])
    .updateOwn(['users', 'shopping-carts', 'chat']);
//# sourceMappingURL=app.roles.js.map