import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import UpdateEmployeeDto from './dto/udpate-employee.dto';
import CreateEmployeeUserDto from './dto/create-employee.dto';
import { UserTypeEnum } from '../users/dto/create-user.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import { BranchOffice } from '../branch-offices/schema/branch-office.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(User.name) private employeeModel: Model<User>,
  ) {
  }

  async create(createEmployeeDto: CreateEmployeeUserDto) {
    await this.findIfExist(createEmployeeDto);
    const createdEmployee = await this.employeeModel.create(
      new CreateEmployeeUserDto(
        createEmployeeDto.dni,
        createEmployeeDto.name,
        createEmployeeDto.surname,
        createEmployeeDto.password,
        createEmployeeDto.phone,
        createEmployeeDto.email,
        true,
        UserTypeEnum.BRANCH_ADMIN,
        generateUnixTimestamp(),
        generateUnixTimestamp(),
      ),
    );
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

  async delete(branchOffice: BranchOffice, employee_id: string) {
    /*const employee = branchOffice.employees.find((user) => {
      if (user._id === employee_id) {
        return user;
      }
      return null;
    });

    const employeeIndex = branchOffice.employees.findIndex(
      user => user._id === employee_id,
    );

    if (employeeIndex == -1) {
      throw new NotFoundException(
        'No se pudo encontrar el usuario en el negocio asignado',
      );
    }
    await this.employeeModel.findByIdAndDelete(employee._id);
    branchOffice.employees.splice(employeeIndex, 1);
    return branchOffice.save();*/
  }
}
