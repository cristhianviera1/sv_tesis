import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid4 } from 'uuid';
import { generateUnixTimestamp } from '../../../utils/generateUnixTimestamp';
import { Address } from '../../addresses/address.model';
import { Product } from '../../products/product.model';
import { User } from '../../users/schemas/user.schema';

@Schema()
export class BranchOffice extends Document {
  @Prop({ default: () => uuid4() })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: Address;

  @Prop()
  products: Product[];

  @Prop({ required: true, default: () => false })
  status?: boolean;

  @Prop()
  employees?: User[];

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

  constructor() {
    super();
    this.products = [];
    this.employees = [];
  }
}

export const BranchOfficeSchema = SchemaFactory.createForClass(BranchOffice);

