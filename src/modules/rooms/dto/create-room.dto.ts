import { IsNotEmpty } from 'class-validator';
import { v4 as uuid4 } from 'uuid';

export default class CreateRoomDto {

  _id: string;

  @IsNotEmpty()
  fromUser: string;

  @IsNotEmpty()
  toUser: string;

  last_message: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;


  constructor(fromUser: string, toUser: string) {
    this._id = uuid4();
    this.fromUser = fromUser;
    this.toUser = toUser;
  }
}
