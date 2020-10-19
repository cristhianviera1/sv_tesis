import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchOffice, BranchOfficeSchema } from '../branch-offices/schema/branch-office.schema';
import { BranchOfficesService } from '../branch-offices/branch-offices.service';
import { JwtStrategy } from '../../strategies/jwt-auth.strategy';
import { BranchOfficesModule } from '../branch-offices/branch-offices.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BranchOffice.name, schema: BranchOfficeSchema },
    ]),
    BranchOfficesModule,
  ],
  providers: [ProductsService, BranchOfficesService, JwtStrategy],
  controllers: [ProductsController],
})
export class ProductsModule {
}
