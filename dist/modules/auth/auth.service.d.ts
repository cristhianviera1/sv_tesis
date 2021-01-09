import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    validateSignIn(email: string, password: string): Promise<User>;
}
