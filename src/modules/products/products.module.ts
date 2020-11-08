import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../../strategies/jwt-auth.strategy';
import { Product, ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [ProductsService, JwtStrategy],
  controllers: [ProductsController],
})
export class ProductsModule {
}
