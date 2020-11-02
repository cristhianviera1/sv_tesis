import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid4 } from 'uuid';
import { generateUnixTimestamp } from '../../../utils/generateUnixTimestamp';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ default: () => uuid4() })
  _id: string;

  @Prop({ required: true })
  fromUser: string;

  @Prop({ required: true })
  toUser: string;

  @Prop()
  last_message: string;


  @Prop({
    type: 'number',
    default: generateUnixTimestamp,
  })
  created_at: number;

  @Prop({
    type: 'number',
    default: generateUnixTimestamp,
  })
  updated_at: number;

  @Prop({
    type: 'number',
  })
  deleted_at: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
