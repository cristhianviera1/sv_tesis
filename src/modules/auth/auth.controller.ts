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
import { FromMail, PasswordBody, PasswordHtml, PasswordSubject } from 'src/consts/mailer-message';
import { MailerService } from '@nestjs-modules/mailer';
import { generateRandomPassword } from '../../utils/generatePassword';

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
      devicesToken: user.devices,
      roles: user.roles,
      status: user.status,
    };

    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }

  @ApiProperty({ description: 'Registro solo para usuarios' })
  @Post('register')
  async signUp(@Body(ValidationPipe) createClientUserDto: CreateClientUserDto) {
    const generatedPassword = generateRandomPassword();

    const client = new CreateClientUserDto(
      createClientUserDto.name,
      createClientUserDto.surname,
      createClientUserDto.email,
      UserTypeEnum.CLIENT,
      generatedPassword,
      true,
      createClientUserDto.birthday,
    );
    const createdUser = await this.userService.create(client);
    this.mailerService.sendMail({
      to: createClientUserDto.email,
      from: FromMail,
      subject: PasswordSubject,
      html: `${PasswordHtml} <br/><p>${PasswordBody(generatedPassword)}</p>`,
    }).then((message) => {
      console.info(message, 'Password send to client email');
    }).catch((err) => {
      console.warn('No se pudo enviar el correo electrónico', err);
      throw new InternalServerErrorException('No se ha podido enviar el correo electrónico, por favor solicite que se envia nuevamente');
    });
    return await createdUser.save();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }

}
