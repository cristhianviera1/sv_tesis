import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateProductDto from './dto/create-product.dto';
import { BranchOfficesService } from '../branch-offices/branch-offices.service';
import UpdateProductDto from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly branchOfficeService: BranchOfficesService,
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
    const associatedBranch = await this.branchOfficeService.findWithEmployee(req?.user?._id);
    return this.productsService.create(createProductDto, associatedBranch);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'create',
    possession: 'own',
  })
  @Get()
  async list(@Req() req) {
    const associatedBranch = await this.branchOfficeService.findWithEmployee(req?.user?._id);
    return this.branchOfficeService.getSafeParameteres(associatedBranch);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'update',
    possession: 'own',
  })
  @Put()
  async update(@Req() req, @Body(ValidationPipe) updateProductDto: UpdateProductDto) {
    const associatedBranch = await this.branchOfficeService.findWithEmployee(req?.user?._id);
    return this.productsService.update(updateProductDto, associatedBranch);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'products',
    action: 'delete',
    possession: 'own',
  })
  @Put(':id')
  async delete(@Req() req, @Param('id') id: string) {
    const associatedBranch = await this.branchOfficeService.findWithEmployee(req?.user?._id);
    return this.productsService.delete(id, associatedBranch);
  }
}
