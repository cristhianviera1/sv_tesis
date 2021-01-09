import { StatusTypeOrder, StatusVoucherType } from '../schema/shopping-cart.schema';
export default class UpdateVoucherStatusDto {
    status: StatusVoucherType;
    delivery_status: StatusTypeOrder;
}
