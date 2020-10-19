import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateProductDto from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'create',
    possession: 'own',
  })
  @Post()
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {

  }
}
