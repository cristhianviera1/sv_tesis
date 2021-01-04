import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from './schemas/user.schema';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import * as bcrypt from 'bcrypt';
import { FromMail, PasswordBody, PasswordHtml, PasswordSubject } from '../../consts/mailer-message';
import { MailerService } from '@nestjs-modules/mailer';
import { generateRandomPassword } from '../../utils/generatePassword';
import UpdatePasswordUserDto from './dto/update-password-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)
              private User: Model<User>,
              private readonly mailerService: MailerService,
  ) {
  }

  async list(condition: FilterQuery<User>, start = 0, items = 20) {
    return this.User.find(condition).skip(start).limit(items);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.existingEmail(createUserDto?.email)) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico.');
    }
    const password = createUserDto.password || generateRandomPassword();
    const user = new CreateUserDto(
      createUserDto.name,
      createUserDto.surname,
      createUserDto.email,
      createUserDto.birthday,
      createUserDto.roles,
      password,
      createUserDto.gender,
      createUserDto.image,
    );
    if (!createUserDto.password) {
      this.mailerService.sendMail({
        to: createUserDto.email,
        from: FromMail,
        subject: PasswordSubject,
        html: `${PasswordHtml} <br/><p>${PasswordBody(password)}</p>`,
      }).then((message) => {
        console.info(message, 'Password send to client email');
      }).catch((err) => {
        console.warn('No se pudo enviar el correo electrónico', err);
        throw new InternalServerErrorException('No se ha podido enviar el correo electrónico, por favor solicite que se envia nuevamente');
      });
    }
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
    return user.save();
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.findOne({ _id: updateUserDto.id });
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario específicado');
    }
    if (updateUserDto.email !== user.email && !!!(await this.existingEmail(updateUserDto.email))) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico y número telefónico.');
    }
    user.name = updateUserDto.name;
    user.surname = updateUserDto.surname;
    if (updateUserDto.password) {
      user.password = bcrypt.hashSync(updateUserDto.password, 10);
    }
    user.email = updateUserDto.email;
    user.status = updateUserDto.status;
    user.devices = updateUserDto.devices;
    user.roles = updateUserDto.roles;
    user.birthday = updateUserDto.birthday;
    user.gender = updateUserDto.gender;
    user.image = updateUserDto.image;
    return await user.save();
  }

  async updateStatus(user: User, status: boolean) {
    user.status = status;
    return await user.save();
  }

  async updateImage(user: User, image: string) {
    user.image = image;
    return await user.save();
  }

  async updatePassword(user: User, updatePasswordUserDto: UpdatePasswordUserDto) {

    const validSign = await bcrypt.compare(updatePasswordUserDto.oldPassword, user.password);
    if (!validSign) {
      throw new ConflictException('La contraseña previa no coincide');
    }
    user.password = bcrypt.hashSync(updatePasswordUserDto.newPassword, 10);
    return user.save();
  }

  async existingEmail(email: string) {
    return this.User.findOne({ email: email });
  }

  getSafeParameters(user: User) {
    return {
      ...user.toObject(),
      devices: undefined,
      type: undefined,
      password: undefined,
      roles: undefined,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    };
  }
}
