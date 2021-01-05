import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { v4 as uuid4 } from 'uuid';
import { generateUnixTimestamp } from '../../../utils/generateUnixTimestamp';


export interface Message {
  type: 'text' | 'image';
  message: string;
}

export interface EmitMessage {
  userFrom: string;
  toUser: string;
  message: Message;
  timeStamp: number;
}

export interface JoinRoom {
  userFrom: string;
  toUser: string;
}


@Schema()
export class Chat extends Document {
  @Prop({ default: () => uuid4() })
  _id: string;

  @Prop({ required: true })
  fromUser: string;

  @Prop({ required: true })
  toUser: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  message: Message;

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

export const ChatSchema = SchemaFactory.createForClass(Chat);
