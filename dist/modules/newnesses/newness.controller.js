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
exports.NewnessController = void 0;
const common_1 = require("@nestjs/common");
const newness_service_1 = require("./newness.service");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const nest_access_control_1 = require("nest-access-control");
const create_newness_dto_1 = __importDefault(require("./dto/create-newness.dto"));
const update_newness_dto_1 = __importDefault(require("./dto/update-newness.dto"));
let NewnessController = class NewnessController {
    constructor(newnessService) {
        this.newnessService = newnessService;
    }
    create(createNewnessDto) {
        return this.newnessService.create(createNewnessDto);
    }
    update(updateNewnessDto) {
        return this.newnessService.update(updateNewnessDto);
    }
    async list(req) {
        var _a, _b;
        const startDate = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.start_date;
        const endDate = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.end_date;
        if (startDate && endDate) {
            return await this.newnessService.list({
                deleted_at: null,
                created_at: {
                    $gte: Number(startDate),
                    $lte: Number(endDate),
                },
            });
        }
        return await this.newnessService.list({ deleted_at: null });
    }
    find(id) {
        return this.newnessService.find(id);
    }
    delete(id) {
        return this.newnessService.delete(id);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'newness',
        action: 'create',
        possession: 'any',
    }),
    common_1.Post(),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_newness_dto_1.default]),
    __metadata("design:returntype", void 0)
], NewnessController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'newness',
        action: 'update',
        possession: 'any',
    }),
    common_1.Put(),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_newness_dto_1.default]),
    __metadata("design:returntype", void 0)
], NewnessController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'newness',
        action: 'read',
        possession: 'any',
    }),
    common_1.Get(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewnessController.prototype, "list", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'newness',
        action: 'read',
        possession: 'any',
    }),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewnessController.prototype, "find", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        resource: 'newness',
        action: 'delete',
        possession: 'any',
    }),
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewnessController.prototype, "delete", null);
NewnessController = __decorate([
    common_1.Controller('newness'),
    __metadata("design:paramtypes", [newness_service_1.NewnessService])
], NewnessController);
exports.NewnessController = NewnessController;
//# sourceMappingURL=newness.controller.js.map