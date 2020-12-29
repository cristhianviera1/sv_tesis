import { Body, Controller, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateShoppingCartRequestDto from './dto/create-shopping-cart-request.dto';
import { UsersService } from '../users/users.service';
import UpdateShoppingCartStatusDto from './dto/update-shopping-cart-status.dto';
import UploadShoppingCartImageDto from './dto/upload-shopping-cart-image.dto';
import UpdateVoucherStatusDto from './dto/update-voucher-status.dto';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(
    private readonly shoppingCartsService: ShoppingCartsService,
    private readonly usersService: UsersService,
  ) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'shopping-carts',
    action: 'read',
    possession: 'any',
  })
  @Get()
  async list() {
    return this.shoppingCartsService.list({});
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'shopping-carts',
    action: 'read',
    possession: 'own',
  })
  @Get('me')
  async myShoppingCart(@Request() req) {
    return this.shoppingCartsService.list({ user: req?.user?._id });
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'shopping-carts',
    action: 'create',
    possession: 'own',
  })
  @Post()
  async create(@Request() req, @Body(ValidationPipe) cartRequestDto: CreateShoppingCartRequestDto) {
    const user = await this.usersService.findById(req?.user?._id);
    return await this.shoppingCartsService.create(cartRequestDto, user);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'shopping-carts',
    action: 'update',
    possession: 'any',
  })
  @Put(':id')
  async updateStatus(@Request() req, @Param('id') id, @Body(ValidationPipe) updateShoppingCartStatus: UpdateShoppingCartStatusDto) {
    const changedBy = await this.usersService.findById(req?.user?._id);
    return await this.shoppingCartsService.updateStatus(changedBy, id, updateShoppingCartStatus);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'shopping-carts',
    action: 'read',
    possession: 'own',
  })
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.shoppingCartsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'shopping-carts',
    action: 'update',
    possession: 'own',
  })
  @Put('upload-voucher/:id')
  async uploadVoucherImage(@Param('id') id: string, @Body() uploadShoppingCartImageDto: UploadShoppingCartImageDto) {
    const shoppingCart = await this.shoppingCartsService.findById(id);
    return await this.shoppingCartsService.uploadVoucherImage(uploadShoppingCartImageDto.image, shoppingCart);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'shopping-carts',
    action: 'update',
    possession: 'any',
  })
  @Put('voucher-status/:id')
  async updateVoucherStatus(
    @Param('id') id: string,
    @Request() req,
    @Body() updateVoucherStatusDto: UpdateVoucherStatusDto,
  ) {
    const shoppingCart = await this.shoppingCartsService.findById(id);
    const user = await this.usersService.findById(req?.user?._id);
    return await this.shoppingCartsService.updateVoucherStatus(user, shoppingCart, updateVoucherStatusDto);
  }
}
