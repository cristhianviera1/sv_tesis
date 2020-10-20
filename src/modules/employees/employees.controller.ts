import { Body, Controller, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { BranchOfficesService } from '../branch-offices/branch-offices.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateEmployeeUserDto from './dto/create-employee.dto';
import DeleteEmployeeDto from './dto/delete-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly branchOfficesService: BranchOfficesService,
    private readonly usersService: UsersService,
  ) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'employees',
    action: 'create',
    possession: 'any',
  })
  @Post()
  async create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeUserDto) {
    const branchOffice = await this.branchOfficesService.find(createEmployeeDto?.branch_office_id);
    const employee = await this.employeesService.create(createEmployeeDto);
    branchOffice.employees.push({ ...this.usersService.getSafeParameters(employee) });
    return branchOffice.save();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'employees',
    action: 'update',
    possession: 'any',
  })
  @Put()
  async delete(@Body(ValidationPipe) deleteEmployeeDto: DeleteEmployeeDto){
    const branchOffice = await this.branchOfficesService.find(deleteEmployeeDto.branch_id);
    return this.employeesService.delete(branchOffice, deleteEmployeeDto.user_id);
  }
}
