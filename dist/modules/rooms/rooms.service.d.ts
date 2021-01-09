import { Room } from './schema/room.schema';
import { User } from '../users/schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
export declare class RoomsService {
    private RoomModel;
    constructor(RoomModel: Model<Room>);
    find(conditions: FilterQuery<Room>): Promise<Room>;
    list(conditions: FilterQuery<Room>): Promise<Room[]>;
    findWithUsers(fromUser: User, toUser: User): import("mongoose").DocumentQuery<Room, Room, {}>;
    create(fromUser: User, toUser: User): Promise<Room>;
    delete(id: string): Promise<boolean>;
}
