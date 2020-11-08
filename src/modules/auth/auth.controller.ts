import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserTypeEnum } from '../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateClientUserDto } from '../users/dto/create-client-user.dto';
import { convertToUnixTimestamp } from '../../utils/generateUnixTimestamp';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
  }

  @Post('sign-in')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    const user = await this.authService.validateSignIn(
      signInDto.email.toLowerCase(),
      signInDto.password,
    );
    if (!user) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const payload = {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      birthday: user.birthday,
      email: user.email,
      phone: user.phone,
      devicesToken: user.devices,
      roles: user.roles,
    };

    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }

  @ApiProperty({ description: 'Registro solo para usuarios' })
  @Post('register')
  async signUp(@Body(ValidationPipe) createClientUserDto: CreateClientUserDto) {

    const client = new CreateClientUserDto(
      createClientUserDto.name,
      createClientUserDto.surname,
      createClientUserDto.gender,
      convertToUnixTimestamp(createClientUserDto.birthday),
      createClientUserDto.password,
      createClientUserDto.phone,
      createClientUserDto.email.toLowerCase(),
      createClientUserDto.status = true,
    );

    client.roles = UserTypeEnum.CLIENT;

    if (
      !(await this.userService.existingPhoneOrEmail(
        createClientUserDto.phone,
        createClientUserDto.email,
      ))
    ) {
      await this.userService.create(client);
      return {
        msg: 'Cliente creado exitosamente',
      };
    }


    return createClientUserDto;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }

}
