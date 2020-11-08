import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid4 } from 'uuid';
import { generateUnixTimestamp } from '../../../utils/generateUnixTimestamp';

@Schema()
export class Product extends Document {
  @Prop({ default: () => uuid4() })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop({ required: true })
  category: Category[];

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true })
  detail: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: true })
  status: boolean;


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

export class Category {
  _id: string;
  name: string;

  constructor(name: string) {
    this._id = uuid4();
    this.name = name;
  }
}


export const ProductSchema = SchemaFactory.createForClass(Product);
