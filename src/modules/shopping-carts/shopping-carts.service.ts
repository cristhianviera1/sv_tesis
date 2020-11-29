import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './schema/shopping-cart.schema';
import { FilterQuery, Model } from 'mongoose';
import CreateShoppingCartDto from './dto/create-shopping-cart.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { User } from '../users/schemas/user.schema';

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

  async create(createShoppingCartDto: CreateShoppingCartDto, user: User) {
    //TODO
    //let products = createShoppingCartDto.products[0].product._id
    /*

    const order = new CreateShoppingCartDto(
      this.usersService.getSafeParameters(user),
      createShoppingCartDto.products,
      generateStatusOrderModel(
        StatusTypeOrderEnum.WAITING_CONTACT,
        generateUnixTimestamp()
      ),


    )*/
  }
}
