import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private User: Model<User>) {
  }

  async list(condition: FilterQuery<User>) {
    return this.User.find(condition);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.existingPhoneOrEmail(createUserDto.phone, createUserDto.email)) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico y número telefónico.');
    }
    const createdUser = new this.User(createUserDto);
    return createdUser.save();
  }

  async findOne(conditions: FilterQuery<User>): Promise<User> {
    const user = await this.User.findOne(conditions);
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.findOne({ _id: id, deleted_at: null });
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario');
    }
    return user;
  }

  async delete(id: string) {
    const user = await this.findOne({ _id: id });
    user.deleted_at = generateUnixTimestamp();
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.findOne({ _id: updateUserDto._id });
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario específicado');
    }
    if (await this.existingPhoneOrEmail(updateUserDto.phone, updateUserDto.email)) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico y número telefónico.');
    }
    user.name = updateUserDto.name;
    user.surname = updateUserDto.surname;
    user.password = updateUserDto.password;
    user.phone = updateUserDto.phone;
    user.email = updateUserDto.email;
    user.status = updateUserDto.status;
    user.devices = updateUserDto.devices;
    user.roles = updateUserDto.roles;
    user.gender = updateUserDto.gender;
    return await user.save();
  }

  async existingPhoneOrEmail(
    phone: string,
    email: string,
  ) {
    return this.User.find({
      $or: [
        { email: email },
        { phone: phone },
      ],
    });
  }

  getSafeParameters(user: User) {
    return {
      ...user.toObject(),
      devices: undefined,
      type: undefined,
      password: undefined,
      status: undefined,
      roles: undefined,
    };
  }

}
