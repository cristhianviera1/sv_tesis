import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UpdateImageUserDto from './dto/update-image-user.dto';
import UpdatePasswordUserDto from './dto/update-password-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Get()
  async list(@Request() req) {
    const users = await this.usersService.list({ deleted_at: null }, req?.start, req?.items);
    return users.map((user) => ({
      ...this.usersService.getSafeParameters(user),
      roles: user.roles,
    }));
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Get('/:id')
  async findOne(@Param('id') id) {
    return this.usersService.findOne({ _id: id });
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'create',
    possession: 'any',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  @Delete('/:id')
  async delete(@Param('id') id) {
    return await this.usersService.delete(id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  @Put('updateStatus')
  async updateStatus(@Request() req) {
    const user = await this.usersService.findById(req?.query?.user?._id);
    return await this.usersService.updateStatus(user, req?.query?.user?.status);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'own',
  })
  @Put('updateImage')
  async updateImage(@Request() req, @Body(ValidationPipe) updateImageUserDto: UpdateImageUserDto) {
    const user = await this.usersService.findById(req?.user?._id);
    return await this.usersService.updateImage(user, updateImageUserDto.image);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'own',
  })
  @Put('updatePassword')
  async updatePassword(@Request() req, @Body(ValidationPipe) updatePasswordUserDto: UpdatePasswordUserDto) {
    const user = await this.usersService.findById(req?.user?._id);
    return await this.usersService.updatePassword(user, updatePasswordUserDto);
  }


}
