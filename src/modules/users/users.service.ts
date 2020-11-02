import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private user: Model<User>) {
  }

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdUser = new this.user(createCatDto);
    return createdUser.save();
  }

  findByEmail(email: string) {
    return this.user.findOne({ email });
  }

  async findOne(conditions: FilterQuery<User>): Promise<User> {
    const user = await this.user.findOne(conditions);
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario');
    }
    return user;
  }

  deleteMany(conditions: FilterQuery<User>) {
    return this.user.deleteMany(conditions);
  }

  async existingPhoneAndEmail(
    createUserDto: CreateUserDto,
  ): Promise<boolean> {
    const emailExists = await this.user.findOne({
      email: createUserDto.email,
    });
    const phoneExists = await this.user.findOne({
      phone: createUserDto.phone,
    });

    if (emailExists) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }
    if (phoneExists) {
      throw new ConflictException(
        'Ya existe un usuario con ese número telefónico',
      );
    }
    return false;
  }

  async list() {
    const users = await this.user.find();
    if (!users) {
      throw new NotFoundException('No se han encontrado usuarios');
    }
    return users.map((user) => ({ ...this.getSafeParameters(user) }));
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.findOne({ _id: updateUserDto.user_id });
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario especificado');
    }
    user.dni = updateUserDto.dni;
    user.name = updateUserDto.name;
    user.surname = updateUserDto.surname;
    user.password = updateUserDto.password;
    user.phone = updateUserDto.phone;
    user.email = updateUserDto.email;
    user.status = updateUserDto.status;
    user.roles = updateUserDto.roles;
    user.gender = updateUserDto.gender;
    user.birthday = updateUserDto.birthday;
    user.updated_at = generateUnixTimestamp();
    return await user.save();
  };

  async delete(userId: string) {
    const user = await this.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario especificado');
    }
    user.deleted_at = generateUnixTimestamp();
    return await user.save();
  }

  getSafeParameters(user: User) {
    return {
      ...user.toObject(),
      devices: undefined,
      type: undefined,
      password: undefined,
      roles: undefined,
    };
  }

}
