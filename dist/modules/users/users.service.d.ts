import {FilterQuery, Model} from 'mongoose';
import {User} from './schemas/user.schema';
import CreateUserDto from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import UpdatePasswordUserDto from './dto/update-password-user.dto';
import {MailerAwsService} from '../../utils/mailerService';
import {CreateClientUserDto} from "./dto/create-client-user.dto";

export declare class UsersService {
    private User;
    private readonly mailerService;

    constructor(User: Model<User>, mailerService: MailerAwsService);

    list(condition: FilterQuery<User>, start?: number, items?: number): Promise<User[]>;

    createClient(createClientUserDto: CreateClientUserDto): Promise<User>;

    create(createUserDto: CreateUserDto): Promise<User>;

    findOne(conditions: FilterQuery<User>): Promise<User>;

    findById(id: string): Promise<User>;
    delete(id: string): Promise<User>;
    update(updateUserDto: UpdateUserDto): Promise<User>;
    updateStatus(user: User, status: boolean): Promise<User>;
    updateImage(user: User, image: string): Promise<User>;
    updatePassword(user: User, updatePasswordUserDto: UpdatePasswordUserDto): Promise<User>;
    existingEmail(email: string): Promise<User>;
    getSafeParameters(user: User): User;
}
