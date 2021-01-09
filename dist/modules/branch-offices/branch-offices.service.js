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
exports.BranchOfficesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const branch_office_schema_1 = require("./schema/branch-office.schema");
const create_branch_office_dto_1 = __importDefault(require("./dto/create-branch-office.dto"));
const generateUnixTimestamp_1 = require("../../utils/generateUnixTimestamp");
let BranchOfficesService = class BranchOfficesService {
    constructor(branchOffice) {
        this.branchOffice = branchOffice;
    }
    async create(createBranchOffice) {
        await this.findIfExist({ $or: [{ email: createBranchOffice.email }, { name: createBranchOffice.name }] }, 'nombre o correo');
        const address = {
            first_address: createBranchOffice.first_address,
            second_address: createBranchOffice.second_address,
            country: createBranchOffice.country,
            state: createBranchOffice.state,
            city: createBranchOffice.city,
            latitude: createBranchOffice.latitude,
            longitude: createBranchOffice.longitude,
        };
        const newBranch = new create_branch_office_dto_1.default(createBranchOffice.name, createBranchOffice.email, address);
        const createdBranch = new this.branchOffice(newBranch);
        return createdBranch.save();
    }
    async find(id) {
        const branchOffice = await this.branchOffice.findOne({ _id: id, deleted_at: null });
        if (!branchOffice) {
            throw new common_1.NotFoundException('No se ha encontrado la sucursal con el id proporcionado');
        }
        return branchOffice;
    }
    async findWithEmployee(id) {
        const branchOffice = await this.branchOffice.findOne({ 'employees._id': id, deleted_at: null });
        if (!branchOffice) {
            throw new common_1.NotFoundException('No se ha encontrado una sucursal asociada al usuario');
        }
        return branchOffice;
    }
    async list() {
        const branchOffices = await this.branchOffice.find({ deleted_at: null });
        if ((branchOffices === null || branchOffices === void 0 ? void 0 : branchOffices.length) < 1) {
            throw new common_1.NotFoundException('No existen sucursales registradas');
        }
        return branchOffices;
    }
    async delete(id) {
        const branchOffice = await this.find(id);
        branchOffice.deleted_at = generateUnixTimestamp_1.generateUnixTimestamp();
        return branchOffice.save();
    }
    async findIfExist(conditions, propName) {
        const existBranch = await this.branchOffice.findOne(Object.assign(Object.assign({}, conditions), { deleted_at: null }));
        if (existBranch) {
            throw new common_1.ConflictException(`Ya existe una sucursal con ese ${propName}`);
        }
    }
    async update(updateBranchOffice) {
        const branchOffice = await this.find(updateBranchOffice._id);
        if (branchOffice.name !== updateBranchOffice.name) {
            await this.findIfExist({ name: updateBranchOffice.name }, 'nombre');
        }
        if (branchOffice.email !== updateBranchOffice.email) {
            await this.findIfExist({ email: updateBranchOffice.email }, 'email');
        }
        branchOffice.name = updateBranchOffice.name;
        branchOffice.email = updateBranchOffice.email;
        branchOffice.address = {
            first_address: updateBranchOffice.first_address,
            second_address: updateBranchOffice.second_address,
            country: updateBranchOffice.country,
            state: updateBranchOffice.state,
            city: updateBranchOffice.city,
            latitude: updateBranchOffice.latitude,
            longitude: updateBranchOffice.longitude,
        };
        branchOffice.updated_at = generateUnixTimestamp_1.generateUnixTimestamp();
        return branchOffice.save();
    }
    async updateStatus(status, id) {
        const branchOffice = await this.find(id);
        branchOffice.status = status;
        return branchOffice.save();
    }
    getSafeParameteres(branchOffice) {
        return Object.assign(Object.assign({}, branchOffice.toObject()), { employees: null, created_at: undefined, updated_at: undefined, deleted_at: undefined });
    }
};
BranchOfficesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(branch_office_schema_1.BranchOffice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BranchOfficesService);
exports.BranchOfficesService = BranchOfficesService;
//# sourceMappingURL=branch-offices.service.js.map