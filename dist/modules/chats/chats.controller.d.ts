import { ChatsService } from './chats.service';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';
export declare class ChatsController {
    private readonly chatsService;
    private readonly usersService;
    private readonly roomsService;
    constructor(chatsService: ChatsService, usersService: UsersService, roomsService: RoomsService);
    list(query: any, req: any): Promise<import("./schema/chat.schema").Chat[]>;
    users(query: any, req: any): Promise<import("../users/schemas/user.schema").User[]>;
}
