import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../../strategies/jwt-auth.strategy';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailerAwsService } from '../../utils/mailerService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersService, JwtStrategy, MailerAwsService],
  controllers: [UsersController],
})
export class UsersModule {
}
