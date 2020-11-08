import { Controller, Get, UseGuards } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(
    private readonly shoppingCartsService: ShoppingCartsService,
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
  }
}
