import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schema/room.schema';
import { User } from '../users/schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import CreateRoomDto from './dto/create-room.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private RoomModel: Model<Room>,
  ) {
  }

  async find(conditions: FilterQuery<Room>) {
    return this.RoomModel.findOne({ ...conditions, deleted_at: null });
  }

  async list(conditions: FilterQuery<Room>) {
    return this.RoomModel.find(conditions);
  }

  findWithUsers(fromUser: User, toUser: User) {
    return this.RoomModel.findOne({
      $or: [
        { fromUser: fromUser._id, toUser: toUser._id },
        { fromUser: toUser._id, toUser: fromUser._id },
      ],
      deleted_at: null,
    });
  }

  async create(fromUser: User, toUser: User) {
    const newRoom = new CreateRoomDto(
      fromUser._id,
      toUser._id,
    );
    return await this.RoomModel.create(newRoom);
  }

  async delete(id: string) {
    const room = await this.find({ _id: id });
    if (!room) {
      throw new NotFoundException('No se ha encontrado la sala');
    }
    room.deleted_at = generateUnixTimestamp();
    room.save();
    return true;
  }


}
