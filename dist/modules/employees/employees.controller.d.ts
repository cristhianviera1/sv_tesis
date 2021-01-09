import { EmployeesService } from './employees.service';
import CreateEmployeeUserDto from './dto/create-employee.dto';
import DeleteEmployeeDto from './dto/delete-employee.dto';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    create(createEmployeeDto: CreateEmployeeUserDto): Promise<import("../users/schemas/user.schema").User>;
    delete(deleteEmployeeDto: DeleteEmployeeDto): Promise<import("../users/schemas/user.schema").User>;
}
