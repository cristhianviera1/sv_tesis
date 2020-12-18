import { Controller, Get, NotFoundException, Query, Request, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { UsersService } from '../users/users.service';
import { UserTypeEnum } from '../users/dto/create-user.dto';
import { RoomsService } from '../rooms/rooms.service';

@Controller('chats')
export class ChatsController {

  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
    private readonly roomsService: RoomsService,
  ) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'chat',
    action: 'read',
    possession: 'own',
  })
  @Get()
  async list(@Query() query, @Request() req) {
    console.log(req?.user, query, 'CHAT');
    const userFrom = await this.usersService.findOne({ _id: req?.user?._id });
    const toUser = await this.usersService.findOne({ _id: query?.toUser });
    if (!userFrom || !toUser) {
      throw new NotFoundException('No se ha encontrado al usuario');
    }
    return this.chatsService.history(userFrom, toUser, query?.limit);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'chat',
    action: 'read',
    possession: 'own',
  })
  @Get('/users')
  async users(@Query() query, @Request() req) {
    const user = req?.user;
    if (user.roles === UserTypeEnum.BRIGADISTA) {
      const roomsCreated = await this.roomsService.list({ $or: [{ fromUser: user._id }, { toUser: user._id }] });
      //Filtramos los _id de los usuarios con quien se ha activado un chat.
      const idOfUsersChats = roomsCreated.map((room) => room.fromUser === user._id ? room.toUser : room.fromUser);
      const users = await this.usersService.list({ _id: { $in: [...idOfUsersChats] } });
      return users.map((user) =>
        this.usersService.getSafeParameters(user),
      );
    }
    const brigadiers = await this.usersService.list({
      roles: 'brigadista',
      deleted_at: null,
      _id: { $ne: user._id },
    }, req?.start, req?.items);
    return brigadiers.map((user) =>
      this.usersService.getSafeParameters(user),
    );
  }
}
