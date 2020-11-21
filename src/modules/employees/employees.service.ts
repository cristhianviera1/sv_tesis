import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import UpdateEmployeeDto from './dto/udpate-employee.dto';
import CreateEmployeeUserDto from './dto/create-employee.dto';
import { UserTypeEnum } from '../users/dto/create-user.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(User.name) private employeeModel: Model<User>,
    private readonly usersService: UsersService,
  ) {
  }

  async create(createEmployeeDto: CreateEmployeeUserDto) {
    await this.findIfExist(createEmployeeDto);
    const employee = new CreateEmployeeUserDto(
      createEmployeeDto.name,
      createEmployeeDto.surname,
      createEmployeeDto.phone,
      createEmployeeDto.email,
      UserTypeEnum.BRANCH_ADMIN,
      createEmployeeDto.gender,
    );
    const createdEmployee = await this.employeeModel.create(employee);
    return createdEmployee.save();
  }

  async findIfExist(employee: UpdateEmployeeDto) {
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
      throw new ConflictException(
        'Un usuario ya se encuentra registrado con este email',
      );
    }
    if (employeeExistsWithPhone) {
      throw new ConflictException(
        'Un usuario ya se encuentra registrado con este telefono',
      );
    }

    if (employeeExistWithDni) {
      throw new ConflictException(
        'Un usuario ya se encuentra registrado con este DNI',
      );
    }
  }

  async delete(employee_id: string) {
    const employee = await this.usersService.findOne({ _id: employee_id });
    if (!employee) {
      throw new NotFoundException('No se ha encontrado el usuario');
    }
    employee.deleted_at = generateUnixTimestamp();
    return await employee.save();
  }

  async update(updateEmployeeDto: UpdateEmployeeDto) {
    await this.findIfExist(updateEmployeeDto);
    const employee = await this.usersService.findOne({ _id: updateEmployeeDto._id });
    if (!employee) {
      throw new NotFoundException('No se ha encontrado el usuario');
    }
    employee.dni = updateEmployeeDto.dni;
    employee.name = updateEmployeeDto.name;
    employee.gender = updateEmployeeDto.gender;
    employee.phone = updateEmployeeDto.phone;
    employee.email = updateEmployeeDto.email;
    return await employee.save();
  }
}
