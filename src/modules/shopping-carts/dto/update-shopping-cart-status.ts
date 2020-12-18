import { StatusTypeOrder, StatusTypeOrderEnum } from '../schema/shopping-cart.schema';

export default class UpdateShoppingCartStatus {
  status: StatusTypeOrder;
}
export const rulesToUpdate = {
  'en contacto': [
    StatusTypeOrderEnum.WAITING_CONTACT,
  ],
  'pendiente entrega': [
    StatusTypeOrderEnum.IN_CONTACT,
  ],
  'entregado': [
    StatusTypeOrderEnum.DELIVERY_PENDING,
  ],
};