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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const mongoose_2 = require("mongoose");
const create_employee_dto_1 = __importDefault(require("./dto/create-employee.dto"));
const create_user_dto_1 = require("../users/dto/create-user.dto");
const generateUnixTimestamp_1 = require("../../utils/generateUnixTimestamp");
const users_service_1 = require("../users/users.service");
const generate_password_1 = __importDefault(require("generate-password"));
const mailer_message_1 = require("../../consts/mailer-message");
const mailerService_1 = require("../../utils/mailerService");
let EmployeesService = class EmployeesService {
    constructor(employeeModel, usersService, mailerService) {
        this.employeeModel = employeeModel;
        this.usersService = usersService;
        this.mailerService = mailerService;
    }
    async create(createEmployeeDto) {
        await this.findIfExist(createEmployeeDto);
        const generatedPassword = generate_password_1.default.generate({
            length: 10,
            numbers: true,
        });
        const employee = new create_employee_dto_1.default(createEmployeeDto.name, createEmployeeDto.surname, createEmployeeDto.email, createEmployeeDto.birthday, create_user_dto_1.UserTypeEnum.BRANCH_ADMIN, generatedPassword, createEmployeeDto.gender, createEmployeeDto.phone);
        this.mailerService.sendMail(createEmployeeDto.email, mailer_message_1.PasswordSubject, mailer_message_1.PasswordBody(generatedPassword));
        const createdEmployee = await this.employeeModel.create(employee);
        return createdEmployee.save();
    }
    async findIfExist(employee) {
        const employeeExistsWithEmail = await this.employeeModel.findOne({
            email: employee.email,
        });
        const employeeExistsWithPhone = await this.employeeModel.findOne({
            phone: employee.phone,
        });
        const employeeExistWithDni = await this.employeeModel.findOne({
            dni: employee.dni,
        });
        if (employeeExistsWithEmail) {
            throw new common_1.ConflictException('Un usuario ya se encuentra registrado con este email');
        }
        if (employeeExistsWithPhone) {
            throw new common_1.ConflictException('Un usuario ya se encuentra registrado con este telefono');
        }
        if (employeeExistWithDni) {
            throw new common_1.ConflictException('Un usuario ya se encuentra registrado con este DNI');
        }
    }
    async delete(employee_id) {
        const employee = await this.usersService.findOne({ _id: employee_id });
        if (!employee) {
            throw new common_1.NotFoundException('No se ha encontrado el usuario');
        }
        employee.deleted_at = generateUnixTimestamp_1.generateUnixTimestamp();
        return await employee.save();
    }
    async update(updateEmployeeDto) {
        await this.findIfExist(updateEmployeeDto);
        const employee = await this.usersService.findOne({ _id: updateEmployeeDto._id });
        if (!employee) {
            throw new common_1.NotFoundException('No se ha encontrado el usuario');
        }
        employee.dni = updateEmployeeDto.dni;
        employee.name = updateEmployeeDto.name;
        employee.gender = updateEmployeeDto.gender;
        employee.email = updateEmployeeDto.email;
        return await employee.save();
    }
};
EmployeesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        mailerService_1.MailerAwsService])
], EmployeesService);
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employees.service.js.map