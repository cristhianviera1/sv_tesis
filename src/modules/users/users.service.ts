import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from './schemas/user.schema';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)
              private User: Model<User>,
  ) {
  }

  async list(condition: FilterQuery<User>, start = 0, items = 20) {
    return this.User.find(condition).skip(start).limit(items);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.existingPhoneOrEmail(createUserDto?.email)) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico.');
    }
    const user = new CreateUserDto(
      createUserDto.name,
      createUserDto.surname,
      createUserDto.email,
      createUserDto.roles,
      createUserDto.password,
      createUserDto.gender,
      createUserDto.phone,
    );
    const createdUser = new this.User(user);
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
    if (updateUserDto.email !== user.email && updateUserDto.phone !== user.phone && !!!(await this.existingPhoneOrEmail(updateUserDto.email))) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico y número telefónico.');
    }
    user.name = updateUserDto.name;
    user.surname = updateUserDto.surname;
    if (updateUserDto.password) {
      user.password = bcrypt.hashSync(updateUserDto.password, 10);
    }
    user.phone = updateUserDto.phone;
    user.email = updateUserDto.email;
    user.status = updateUserDto.status;
    user.devices = updateUserDto.devices;
    user.roles = updateUserDto.roles;
    user.gender = updateUserDto.gender;
    return await user.save();
  }

  async updateStatus(user: User, status: boolean) {
    user.status = status;
    return await user.save();
  }

  async existingPhoneOrEmail(email: string) {
    return this.User.findOne({ email: email });
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
