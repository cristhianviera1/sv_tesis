import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, NotFoundException } from '@nestjs/common';
import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from '../users/users.service';
import { EmitMessage, JoinRoom } from './schema/chat.schema';
import { ChatsService } from './chats.service';
import CreateChatDto from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
    private readonly chatsService: ChatsService,
  ) {
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, data: EmitMessage) {
    const userFrom = await this.usersService.findOne({ _id: data.userFrom });
    const toUser = await this.usersService.findOne({ _id: data.toUser });
    if (!userFrom || !toUser) {
      throw new NotFoundException('No se ha encontrado el usuario específicado');
    }
    const room = await this.roomsService.findWithUsers(userFrom, toUser);
    const chat = new CreateChatDto(
      userFrom._id,
      toUser._id,
      data.message,
    );
    await this.chatsService.create(chat);
    this.server.to(room._id).emit('sendMessage', chat);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, data: JoinRoom) {
    const userFrom = await this.usersService.findOne({ _id: data.userFrom });
    const toUser = await this.usersService.findOne({ _id: data.toUser });
    if (!userFrom || !toUser) {
      throw new NotFoundException('No se ha encontrado el usuario específicado');
    }
    const room = await this.roomsService.findWithUsers(userFrom, toUser);

    if (!room) {
      const newRoom = await this.roomsService.create(userFrom, toUser);
      client.join(newRoom._id);
    }

    client.join(room._id);
  }

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
