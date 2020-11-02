import { Controller, Get, NotFoundException, Query, Request, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { UsersService } from '../users/users.service';

@Controller('chats')
export class ChatsController {

  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
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
    const userFrom = await this.usersService.findOne({ _id: req?.user?._id });
    const toUser = await this.usersService.findOne({ _id: query?.toUser });
    if (userFrom || toUser) {
      throw new NotFoundException('No se ha encontrado al usuario');
    }
    return this.chatsService.history(userFrom, toUser, query?.limit);
  }
}
