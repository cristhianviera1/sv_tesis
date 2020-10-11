import { Injectable } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {
    }

    async validateSignIn(email: string, password: string): Promise<User> {
        const user = await this.userService.findOne({
            email,
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }
        return user;
    }
}
