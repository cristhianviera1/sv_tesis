import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUnixTimestamp } from '../../../utils/generateUnixTimestamp';
import { v4 as uuid4 } from 'uuid';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schema/product.schema';

@Schema()
export class ShoppingCart extends Document {
  @Prop({ default: () => uuid4() })
  _id: string;

  @Prop({ required: true })
  user: User;

  @Prop({ required: true })
  products: ProductDetail[];

  @Prop({ required: true })
  status: StatusOrder[];

  @Prop()
  voucher: VoucherDetail;

  @Prop({ required: true })
  total: number;

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

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);


export interface StatusOrder {
  status: StatusTypeOrder,
  comments?: string
  timestamp: number
}

export interface ProductDetail {
  product: Product,
  quantity: number,
}

export interface VoucherDetail {
  statuses: VoucherStatus[],
  image?: string,
}

export interface VoucherStatus {
  status: StatusVoucherType,
  description?: string,
  created_at: number
}

export type StatusTypeOrder =
  | 'esperando contacto'
  | 'en contacto'
  | 'pendiente entrega'
  | 'entregado'
  | 'anulado'


export enum StatusTypeOrderEnum {
  WAITING_CONTACT = 'esperando contacto',
  IN_CONTACT = 'en contacto',
  DELIVERY_PENDING = 'pendiente entrega',
  DELIVERED = 'entregado',
  CANCELED = 'anulado',
}

export type StatusVoucherType =
  | 'pendiente comprobante'
  | 'pendiente aprobación'
  | 'aprobado'
  | 'denegado'

export enum StatusVoucherEnum {
  WAIGTING_VAUCHER = 'pendiente comprobante',
  WAITING_APROVAL = 'pendiente aprobación',
  APPROVED = 'aprobado',
  DENIED = 'denegado',
}

export const generateStatusOrderModel = (status: StatusTypeOrder, timestamp: number, comments: string = undefined): StatusOrder => ({
  status,
  timestamp,
  comments,
});
