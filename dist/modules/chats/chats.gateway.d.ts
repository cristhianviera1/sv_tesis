import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from '../users/users.service';
import { EmitMessage, JoinRoom } from './schema/chat.schema';
import { ChatsService } from './chats.service';
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly roomsService;
    private readonly usersService;
    private readonly chatsService;
    constructor(roomsService: RoomsService, usersService: UsersService, chatsService: ChatsService);
    server: Server;
    private logger;
    handleMessage(client: Socket, data: EmitMessage): Promise<void>;
    handleJoinRoom(client: Socket, data: JoinRoom): Promise<Socket>;
    afterInit(): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
}
