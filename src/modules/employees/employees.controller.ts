import { Body, Controller, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateEmployeeUserDto from './dto/create-employee.dto';
import DeleteEmployeeDto from './dto/delete-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
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
    return await this.employeesService.create(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'employees',
    action: 'update',
    possession: 'any',
  })
  @Put()
  async delete(@Body(ValidationPipe) deleteEmployeeDto: DeleteEmployeeDto) {
    return this.employeesService.delete(deleteEmployeeDto.user_id);
  }
}
