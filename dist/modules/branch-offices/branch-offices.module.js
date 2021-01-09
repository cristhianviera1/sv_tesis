"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchOfficesModule = void 0;
const common_1 = require("@nestjs/common");
const branch_offices_controller_1 = require("./branch-offices.controller");
const branch_offices_service_1 = require("./branch-offices.service");
const mongoose_1 = require("@nestjs/mongoose");
const branch_office_schema_1 = require("./schema/branch-office.schema");
const jwt_auth_strategy_1 = require("../../strategies/jwt-auth.strategy");
let BranchOfficesModule = class BranchOfficesModule {
};
BranchOfficesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: branch_office_schema_1.BranchOffice.name, schema: branch_office_schema_1.BranchOfficeSchema },
            ]),
        ],
        controllers: [branch_offices_controller_1.BranchOfficesController],
        providers: [branch_offices_service_1.BranchOfficesService, jwt_auth_strategy_1.JwtStrategy],
        exports: [branch_offices_service_1.BranchOfficesService],
    })
], BranchOfficesModule);
exports.BranchOfficesModule = BranchOfficesModule;
//# sourceMappingURL=branch-offices.module.js.map