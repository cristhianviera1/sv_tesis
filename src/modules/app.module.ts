import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { roles } from '../consts/app.roles';
import { UsersModule } from './users/users.module';
import { AccessControlModule } from 'nest-access-control';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BranchOfficesModule } from './branch-offices/branch-offices.module';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { EmployeesModule } from './employees/employees.module';
import { NewnessModule } from './newnesses/newness.module';
import { ProductsModule } from './products/products.module';
import { ChatsGateway } from './chats/chats.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(`mongodb://${process.env.APP_DBUSERNAME}:${process.env.APP_DBPASSWORD}@${process.env.APP_DBHOST}/${process.env.APP_DBNAME}?authSource=admin`),
    BranchOfficesModule,
    AuthModule,
    CountriesModule,
    AccessControlModule.forRoles(roles),
    EmployeesModule,
    NewnessModule,
    ProductsModule,
    //ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatsGateway],
})
export class AppModule {
}
