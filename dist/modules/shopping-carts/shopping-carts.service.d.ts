import { ShoppingCart } from './schema/shopping-cart.schema';
import { FilterQuery, Model } from 'mongoose';
import CreateShoppingCartRequestDto from './dto/create-shopping-cart-request.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { User } from '../users/schemas/user.schema';
import UpdateShoppingCartStatusDto from './dto/update-shopping-cart-status.dto';
import UpdateVoucherStatusDto from './dto/update-voucher-status.dto';
import { MailerAwsService } from "../../utils/mailerService";
export declare class ShoppingCartsService {
    private ShoppingCartModel;
    private readonly usersService;
    private readonly productsService;
    private readonly mailerService;
    constructor(ShoppingCartModel: Model<ShoppingCart>, usersService: UsersService, productsService: ProductsService, mailerService: MailerAwsService);
    list(conditions: FilterQuery<ShoppingCart>): import("mongoose").DocumentQuery<ShoppingCart[], ShoppingCart, {}>;
    findOne(conditions: FilterQuery<ShoppingCart>): import("mongoose").DocumentQuery<ShoppingCart, ShoppingCart, {}>;
    findById(id: string): Promise<ShoppingCart>;
    create(createShoppingCartDto: CreateShoppingCartRequestDto, user: User): Promise<ShoppingCart>;
    uploadVoucherImage(image: string, shoppingCart: ShoppingCart): Promise<ShoppingCart>;
    updateStatus(changedBy: User, cart_id: string, updateShoppingCartStatus: UpdateShoppingCartStatusDto): Promise<ShoppingCart>;
    updateVoucherStatus(changedBy: User, shoppingCart: ShoppingCart, updateVoucherStatusDto: UpdateVoucherStatusDto): Promise<ShoppingCart>;
    updateDeliveryStatus(changedBy: User, shoppingCart: ShoppingCart, updateVoucherStatusDto: UpdateVoucherStatusDto): Promise<ShoppingCart>;
    deleteShoppingCart(changedBy: User, shoppingCart: ShoppingCart): Promise<ShoppingCart>;
}
