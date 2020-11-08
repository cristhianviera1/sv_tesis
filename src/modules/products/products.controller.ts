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
    possession: 'any',
  })
  @Post()
  async create(@Req() req, @Body(ValidationPipe) createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'read',
    possession: 'any',
  })
  @Get()
  async list() {
    return await this.productsService.list({});
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'read',
    possession: 'any',
  })
  @Get('/:id')
  async find(@Param('id')id) {
    return await this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'update',
    possession: 'any',
  })
  @Put()
  async update(@Body(ValidationPipe) updateProductDto: UpdateProductDto) {
    return await this.productsService.update(updateProductDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'delete',
    possession: 'any',
  })
  @Put('/:id')
  async delete(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }
}
