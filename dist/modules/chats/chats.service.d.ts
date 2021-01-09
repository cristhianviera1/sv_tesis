import { Chat } from './schema/chat.schema';
import { Model } from 'mongoose';
import CreateChatDto from './dto/create-chat.dto';
import { User } from '../users/schemas/user.schema';
export declare class ChatsService {
    private ChatModel;
    constructor(ChatModel: Model<Chat>);
    create(createChatDto: CreateChatDto): Promise<Chat>;
    history(fromUser: User, toUser: User, limit?: number): Promise<Chat[]>;
}
