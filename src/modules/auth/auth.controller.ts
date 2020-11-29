import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserTypeEnum } from '../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateClientUserDto } from '../users/dto/create-client-user.dto';
import generator from 'generate-password';
import { FromMail, PasswordBody, PasswordHtml, PasswordSubject } from 'src/consts/mailer-message';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
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

    const generatedPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    const client = new CreateClientUserDto(
      createClientUserDto.name,
      createClientUserDto.surname,
      createClientUserDto.phone,
      createClientUserDto.email,
      UserTypeEnum.CLIENT,
      createClientUserDto.gender,
      generatedPassword,
      true,
      createClientUserDto.birthday,
    );
    this.mailerService.sendMail({
      to: createClientUserDto.email,
      from: FromMail,
      subject: PasswordSubject,
      text: PasswordBody(generatedPassword),
      html: PasswordHtml,
    }).then((message) => {
      console.info(message);
    }).catch(() => {
      throw new InternalServerErrorException('No se ha podido enviar el correo electrónico, por favor solicite que se envia nuevamente');
    });
    const createdUser = await this.userService.create(client);
    return await createdUser.save();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }

}
