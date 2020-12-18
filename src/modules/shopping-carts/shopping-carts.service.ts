import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { generateStatusOrderModel, ShoppingCart, StatusTypeOrderEnum } from './schema/shopping-cart.schema';
import { FilterQuery, Model } from 'mongoose';
import CreateShoppingCartRequestDto from './dto/create-shopping-cart-request.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { User } from '../users/schemas/user.schema';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import UpdateShoppingCartStatus from './dto/update-shopping-cart-status';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private ShoppingCartModel: Model<ShoppingCart>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {
  }

  list(conditions: FilterQuery<ShoppingCart>) {
    return this.ShoppingCartModel.find(conditions);
  }

  findOne(conditions: FilterQuery<ShoppingCart>) {
    return this.ShoppingCartModel.findOne(conditions);
  }

  async findById(id: string): Promise<ShoppingCart> {
    const shoppingCart = this.findOne({ _id: id });
    if (!shoppingCart) {
      throw new NotFoundException('No se ha encontrado el carrito con el id proporcionado');
    }
    return shoppingCart;
  }

  async create(createShoppingCartDto: CreateShoppingCartRequestDto, user: User) {
    let total = 0;
    for (let i = 0; i < createShoppingCartDto.products.length; i++) {
      const productDetail = createShoppingCartDto.products[i];
      const productEntity = await this.productsService.findById(productDetail.product._id);
      total += (productEntity.price * productDetail.quantity);
    }
    const newShoppingCart = new CreateShoppingCartDto(
      user,
      createShoppingCartDto.products,
      generateStatusOrderModel(
        StatusTypeOrderEnum.WAITING_CONTACT,
        generateUnixTimestamp(),
      ),
      total,
    );
    return await this.ShoppingCartModel.create(newShoppingCart);
  }

  async updateStatus(changedBy: User, cart_id: string, updateShoppingCartStatus: UpdateShoppingCartStatus) {
    const order = await this.findOne({
      _id: cart_id,
      'status.status': { $nin: [StatusTypeOrderEnum.DELIVERED, StatusTypeOrderEnum.CANCELED] },
      deleted_at: null,
    });
    order.status.push(
      generateStatusOrderModel(
        updateShoppingCartStatus.status,
        generateUnixTimestamp(),
        `La transacción fue actualizada por: ${changedBy.name} ${changedBy.surname}. con email: ${changedBy.email}`,
      ),
    );
    if (updateShoppingCartStatus.status === StatusTypeOrderEnum.CANCELED) {
      order.deleted_at = generateUnixTimestamp();
    }
    order.markModified('status');
    return await order.save();
  }
}
