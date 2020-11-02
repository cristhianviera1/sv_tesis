import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schema/room.schema';
import { UsersService } from '../users/users.service';
import { UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: 'User', schema: UserSchema },
    ]),
    UsersModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService, UsersService],
})
export class RoomsModule {
}
