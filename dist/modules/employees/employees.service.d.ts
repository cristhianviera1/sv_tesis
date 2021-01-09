import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import UpdateEmployeeDto from './dto/udpate-employee.dto';
import CreateEmployeeUserDto from './dto/create-employee.dto';
import { UsersService } from '../users/users.service';
import { MailerAwsService } from '../../utils/mailerService';
export declare class EmployeesService {
    private employeeModel;
    private readonly usersService;
    private readonly mailerService;
    constructor(employeeModel: Model<User>, usersService: UsersService, mailerService: MailerAwsService);
    create(createEmployeeDto: CreateEmployeeUserDto): Promise<User>;
    findIfExist(employee: UpdateEmployeeDto): Promise<void>;
    delete(employee_id: string): Promise<User>;
    update(updateEmployeeDto: UpdateEmployeeDto): Promise<User>;
}
