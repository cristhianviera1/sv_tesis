import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schema/product.schema';
export declare class ShoppingCart extends Document {
    _id: string;
    user: User;
    products: ProductDetail[];
    status: StatusOrder[];
    voucher: VoucherDetail;
    total: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}
export declare const ShoppingCartSchema: mongoose.Schema<any>;
export interface StatusOrder {
    status: StatusTypeOrder;
    comments?: string;
    timestamp: number;
}
export interface ProductDetail {
    product: Product;
    quantity: number;
}
export interface VoucherDetail {
    statuses: VoucherStatus[];
    image?: string;
}
export interface VoucherStatus {
    status: StatusVoucherType;
    description?: string;
    created_at: number;
}
export declare type StatusTypeOrder = 'esperando contacto' | 'en contacto' | 'pendiente entrega' | 'entregado' | 'anulado';
export declare enum StatusTypeOrderEnum {
    WAITING_CONTACT = "esperando contacto",
    IN_CONTACT = "en contacto",
    DELIVERY_PENDING = "pendiente entrega",
    DELIVERED = "entregado",
    CANCELED = "anulado"
}
export declare type StatusVoucherType = 'pendiente comprobante' | 'pendiente aprobación' | 'aprobado' | 'denegado';
export declare enum StatusVoucherEnum {
    WAIGTING_VAUCHER = "pendiente comprobante",
    WAITING_APROVAL = "pendiente aprobaci\u00F3n",
    APPROVED = "aprobado",
    DENIED = "denegado"
}
export declare const generateStatusOrderModel: (status: StatusTypeOrder, timestamp: number, comments?: string) => StatusOrder;
