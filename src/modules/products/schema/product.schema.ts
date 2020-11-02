import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUnixTimestamp } from '../../../utils/generateUnixTimestamp';
import { v4 as uuid4 } from 'uuid';

@Schema()
export class Product extends Document {
  @Prop({ default: () => uuid4() })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  detail: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: Category[];

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, default: true })
  status: boolean;

  @Prop({ required: true })
  image: string;

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

export const ProductSchema = SchemaFactory.createForClass(Product);

export class Category {
  _id: string;
  name: string;

  constructor(name: string) {
    this._id = uuid4();
    this.name = name;
  }
}
