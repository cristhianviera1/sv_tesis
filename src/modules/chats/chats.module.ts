import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { ChatSchema } from './schema/chat.schema';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';
import { RoomsModule } from '../rooms/rooms.module';
import { RoomSchema } from '../rooms/schema/room.schema';
import { ChatsGateway } from './chats.gateway';
import { MailerAwsService } from '../../utils/mailerService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Room', schema: RoomSchema },
    ]),
    UsersModule,
    RoomsModule,
  ],
  providers: [ChatsService, UsersService, RoomsService, ChatsGateway, MailerAwsService],
  controllers: [ChatsController],
})
export class ChatsModule {
}
