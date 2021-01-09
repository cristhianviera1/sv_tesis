import { StatusTypeOrder, StatusTypeOrderEnum } from '../schema/shopping-cart.schema';
export default class UpdateShoppingCartStatusDto {
    status: StatusTypeOrder;
}
export declare const rulesToUpdate: {
    'en contacto': StatusTypeOrderEnum[];
    'pendiente entrega': StatusTypeOrderEnum[];
    entregado: StatusTypeOrderEnum[];
};
