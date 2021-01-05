import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserGender, UserType } from '../dto/create-user.dto';
import { v4 as uuid4 } from 'uuid';
import { generateUnixTimestamp } from '../../../utils/generateUnixTimestamp';

@Schema()
export class User extends Document {
  @Prop({ default: () => uuid4() })
  _id: string;

  @Prop()
  dni: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: () => false })
  status?: boolean;

  @Prop({ required: false })
  devices?: string[];

  @Prop()
  roles: UserType;

  @Prop()
  gender?: UserGender;

  @Prop()
  birthday?: number;

  @Prop()
  image?: string;

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

export const UserSchema = SchemaFactory.createForClass(User);
