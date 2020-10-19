import { Module } from '@nestjs/common';
import { BranchOfficesController } from './branch-offices.controller';
import { BranchOfficesService } from './branch-offices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchOffice, BranchOfficeSchema } from './schema/branch-office.schema';
import { JwtStrategy } from '../../strategies/jwt-auth.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BranchOffice.name, schema: BranchOfficeSchema },
    ]),
  ],
  controllers: [BranchOfficesController],
  providers: [BranchOfficesService, JwtStrategy],
  exports: [BranchOfficesService],
})
export class BranchOfficesModule {
}
