import { Body, Controller, Delete, Get, Param, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import UpdateUserDto from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Get()
  list() {
    return this.usersService.list();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  @Put()
  update(@Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'delete',
    possession: 'any',
  })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
