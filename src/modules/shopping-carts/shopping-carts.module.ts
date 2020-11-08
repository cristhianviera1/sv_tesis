import { Module } from '@nestjs/common';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ShoppingCartsService } from './shopping-carts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCart } from './schema/shopping-cart.schema';
import { UsersModule } from '../users/users.module';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCart },
      { name: User.name, schema: User },
    ]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService, UsersService, ProductsService],
})
export class ShoppingCartsModule {
}
