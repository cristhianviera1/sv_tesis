"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchOfficesController = void 0;
const common_1 = require("@nestjs/common");
const branch_offices_service_1 = require("./branch-offices.service");
const nest_access_control_1 = require("nest-access-control");
const create_branch_office_dto_1 = __importDefault(require("./dto/create-branch-office.dto"));
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const update_branch_office_dto_1 = __importDefault(require("./dto/update-branch-office.dto"));
let BranchOfficesController = class BranchOfficesController {
    constructor(branchOfficeService) {
        this.branchOfficeService = branchOfficeService;
    }
    create(createBranchOfficeDto) {
        return this.branchOfficeService.create(createBranchOfficeDto);
    }
    list() {
        return this.branchOfficeService.list();
    }
    find(id) {
        return this.branchOfficeService.find(id);
    }
    delete(id) {
        return this.branchOfficeService.delete(id);
    }
    update(updateBranchOfficeDto) {
        return this.branchOfficeService.update(updateBranchOfficeDto);
    }
    changeStatus({ toggle_status }, id) {
        return this.branchOfficeService.updateStatus(toggle_status, id);
    }
    async findWithEmployee(req) {
        var _a;
        const branchOffice = await this.branchOfficeService.findWithEmployee((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        return this.branchOfficeService.getSafeParameteres(branchOffice);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'branchOffices',
        action: 'create',
        possession: 'any',
    }),
    common_1.Post(),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_branch_office_dto_1.default]),
    __metadata("design:returntype", void 0)
], BranchOfficesController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'branchOffices',
        action: 'read',
        possession: 'any',
    }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BranchOfficesController.prototype, "list", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'branchOffices',
        action: 'read',
        possession: 'any',
    }),
    common_1.Get('id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BranchOfficesController.prototype, "find", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'branchOffices',
        action: 'delete',
        possession: 'any',
    }),
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BranchOfficesController.prototype, "delete", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'branchOffices',
        action: 'update',
        possession: 'any',
    }),
    common_1.Put(),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_branch_office_dto_1.default]),
    __metadata("design:returntype", void 0)
], BranchOfficesController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'branchOffices',
        action: 'update',
        possession: 'any',
    }),
    common_1.Put('/status/:id'),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BranchOfficesController.prototype, "changeStatus", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'branchOffices',
        action: 'read',
        possession: 'own',
    }),
    common_1.Get('/own'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BranchOfficesController.prototype, "findWithEmployee", null);
BranchOfficesController = __decorate([
    common_1.Controller('branch-offices'),
    __metadata("design:paramtypes", [branch_offices_service_1.BranchOfficesService])
], BranchOfficesController);
exports.BranchOfficesController = BranchOfficesController;
//# sourceMappingURL=branch-offices.controller.js.map