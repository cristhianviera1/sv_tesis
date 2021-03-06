import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { BranchOffice, BranchOfficeSchema } from '../branch-offices/schema/branch-office.schema';
import { BranchOfficesService } from '../branch-offices/branch-offices.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { BranchOfficesModule } from '../branch-offices/branch-offices.module';
import { MailerAwsService } from '../../utils/mailerService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BranchOffice.name, schema: BranchOfficeSchema },
    ]),
    UsersModule,
    BranchOfficesModule,
  ],
  providers: [EmployeesService, BranchOfficesService, UsersService, MailerAwsService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
