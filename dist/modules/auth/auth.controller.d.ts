import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateClientUserDto } from '../users/dto/create-client-user.dto';
import { MailerAwsService } from '../../utils/mailerService';
export declare class AuthController {
    private userService;
    private authService;
    private jwtService;
    private readonly mailerService;
    constructor(userService: UsersService, authService: AuthService, jwtService: JwtService, mailerService: MailerAwsService);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    signUp(createClientUserDto: CreateClientUserDto): Promise<import("../users/schemas/user.schema").User>;
    recoverPass(email: string): Promise<import("../users/schemas/user.schema").User>;
    getMe(req: any): Promise<import("../users/schemas/user.schema").User>;
}
