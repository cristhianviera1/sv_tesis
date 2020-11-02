import { IsNotEmpty } from 'class-validator';
import { Message } from '../schema/chat.schema';
import { v4 as uuid4 } from 'uuid';

export default class CreateChatDto {
  _id: string;

  @IsNotEmpty()
  fromUser: string;

  @IsNotEmpty()
  toUser: string;

  @IsNotEmpty()
  message: Message;

  created_at: number;
  updated_at: number;
  deleted_at: number;

  constructor(fromUser: string, toUser: string, message: Message) {
    this._id = uuid4();
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.message = message;
  }
}
