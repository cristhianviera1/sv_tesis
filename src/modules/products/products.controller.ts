import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'create',
    possession: 'own',
  })
  @Post()
  async create(@Req() req, @Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'create',
    possession: 'own',
  })
  @Get()
  async list() {
    return this.productsService.list();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'update',
    possession: 'own',
  })
  @Put()
  async update(@Req() req, @Body(ValidationPipe) updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'delete',
    possession: 'own',
  })
  @Put(':id')
  async delete(@Req() req, @Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
