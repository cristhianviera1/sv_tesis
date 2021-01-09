"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const employees_service_1 = require("./employees.service");
const employees_controller_1 = require("./employees.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const branch_office_schema_1 = require("../branch-offices/schema/branch-office.schema");
const branch_offices_service_1 = require("../branch-offices/branch-offices.service");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const branch_offices_module_1 = require("../branch-offices/branch-offices.module");
const mailerService_1 = require("../../utils/mailerService");
let EmployeesModule = class EmployeesModule {
};
EmployeesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: branch_office_schema_1.BranchOffice.name, schema: branch_office_schema_1.BranchOfficeSchema },
            ]),
            users_module_1.UsersModule,
            branch_offices_module_1.BranchOfficesModule,
        ],
        providers: [employees_service_1.EmployeesService, branch_offices_service_1.BranchOfficesService, users_service_1.UsersService, mailerService_1.MailerAwsService],
        controllers: [employees_controller_1.EmployeesController],
    })
], EmployeesModule);
exports.EmployeesModule = EmployeesModule;
//# sourceMappingURL=employees.module.js.map