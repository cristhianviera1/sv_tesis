import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schema/chat.schema';
import { Model } from 'mongoose';
import CreateChatDto from './dto/create-chat.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private ChatModel: Model<Chat>) {
  }

  async create(createChatDto: CreateChatDto) {
    const newChat = new CreateChatDto(
      createChatDto.fromUser,
      createChatDto.toUser,
      createChatDto.message,
    );
    const savedChat = await this.ChatModel.create(newChat);
    return savedChat.save();
  }

  async history(fromUser: User, toUser: User, limit = 30) {
    const chats = await this.ChatModel.find({
      $or: [
        { fromUser: fromUser._id, toUser: toUser._id },
        { fromUser: toUser._id, toUser: fromUser._id },
      ],
      deleted_at: null,
    }).limit(limit);
    if (!chats) {
      throw new NotFoundException('Aún no tienes chats');
    }
    return chats;
  }
}
