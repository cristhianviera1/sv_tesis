/// <reference types="mongoose" />
import { ShoppingCartsService } from './shopping-carts.service';
import CreateShoppingCartRequestDto from './dto/create-shopping-cart-request.dto';
import { UsersService } from '../users/users.service';
import UpdateShoppingCartStatusDto from './dto/update-shopping-cart-status.dto';
import UploadShoppingCartImageDto from './dto/upload-shopping-cart-image.dto';
import UpdateVoucherStatusDto from './dto/update-voucher-status.dto';
export declare class ShoppingCartsController {
    private readonly shoppingCartsService;
    private readonly usersService;
    constructor(shoppingCartsService: ShoppingCartsService, usersService: UsersService);
    list(): Promise<import("./schema/shopping-cart.schema").ShoppingCart[]>;
    myShoppingCart(req: any): import("mongoose").DocumentQuery<import("./schema/shopping-cart.schema").ShoppingCart[], import("./schema/shopping-cart.schema").ShoppingCart, {}>;
    create(req: any, cartRequestDto: CreateShoppingCartRequestDto): Promise<import("./schema/shopping-cart.schema").ShoppingCart>;
    updateStatus(req: any, id: any, updateShoppingCartStatus: UpdateShoppingCartStatusDto): Promise<import("./schema/shopping-cart.schema").ShoppingCart>;
    find(id: string): Promise<import("./schema/shopping-cart.schema").ShoppingCart>;
    uploadVoucherImage(id: string, uploadShoppingCartImageDto: UploadShoppingCartImageDto): Promise<import("./schema/shopping-cart.schema").ShoppingCart>;
    updateVoucherStatus(id: string, req: any, updateVoucherStatusDto: UpdateVoucherStatusDto): Promise<import("./schema/shopping-cart.schema").ShoppingCart>;
}
