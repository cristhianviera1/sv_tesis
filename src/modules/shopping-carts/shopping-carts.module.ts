import { Module } from '@nestjs/common';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ShoppingCartsService } from './shopping-carts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { Product, ProductSchema } from '../products/schema/product.schema';
import { JwtStrategy } from '../../strategies/jwt-auth.strategy';
import { ShoppingCart, ShoppingCartSchema } from './schema/shopping-cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    UsersModule,
    ProductsModule,
  ],
  providers: [ShoppingCartsService, UsersService, ProductsService, JwtStrategy],
  controllers: [ShoppingCartsController],
})
export class ShoppingCartsModule {
}
