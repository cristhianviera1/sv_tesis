import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { BranchOfficesService } from '../branch-offices/branch-offices.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateEmployeeUserDto from './dto/create-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly branchOfficesService: BranchOfficesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'employees',
    action: 'create',
    possession: 'any',
  })
  @Post()
  async create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeUserDto) {
    const createdEmployee = await this.employeesService.create(createEmployeeDto);
    const branchOffice = await this.branchOfficesService.find(createEmployeeDto?.branch_office_id);
    branchOffice.employees.push(this.usersService.getSafeParameters(createdEmployee))
    return branchOffice.save();
  }
}
