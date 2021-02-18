import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {ApiProperty} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {SignInDto} from './dto/sign-in.dto';
import {JwtAuthGuard} from '../../guards/jwt-auth.guard';
import {CreateClientUserDto} from '../users/dto/create-client-user.dto';
import {PasswordBody, PasswordRecoverSubject, PassworReceiverdHtml,} from 'src/consts/mailer-message';
import {generateRandomPassword} from '../../utils/generatePassword';
import {MailerAwsService} from '../../utils/mailerService';

@Controller('auth')
export class AuthController {
  constructor(
      private userService: UsersService,
      private authService: AuthService,
      private jwtService: JwtService,
      private readonly mailerService: MailerAwsService,
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
    return await this.userService.createClient(createClientUserDto);
  }

  @ApiProperty()
  @Get('recover/:email')
  async recoverPass(@Param('email') email: string) {
    const generatedPassword = generateRandomPassword();
    const userEmail = email.toLocaleLowerCase().trim();
    const user = await this.userService.findOne({ email: userEmail });
    this.mailerService.sendMail(
      userEmail,
      PasswordRecoverSubject,
      `${PassworReceiverdHtml} <br/><p>${PasswordBody(generatedPassword)}</p>`,
    );
    user.password = generatedPassword;
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const user = await this.userService.findById(req?.user?._id);
    return this.userService.getSafeParameters(user);
  }
}
