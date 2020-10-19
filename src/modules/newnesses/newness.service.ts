import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Newness } from './schema/newness.schema';
import { Model } from 'mongoose';
import CreateNewnessDto from './dto/create-newness.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import UpdateNewnessDto from './dto/update-newness.dto';

@Injectable()
export class NewnessService {
  constructor(@InjectModel(Newness.name) private newness: Model<Newness>) {
  }

  async create(createNewnessDto: CreateNewnessDto) {
    const createdNewness = new this.newness(createNewnessDto);
    return createdNewness.save();
  }

  async find(id: string) {
    const newness = await this.newness.findOne({ _id: id, deleted_at: null });
    if (!newness) {
      throw new NotFoundException('No se encontró la novedad');
    }
    return newness;
  }

  async list() {
    const newnesses = await this.newness.find({ deleted_at: null }).sort({ created_at: -1 });
    if (newnesses?.length < 1) {
      throw new NotFoundException('No se han encontrado novedades');
    }
    return newnesses;
  }

  async update(updateNewnessDto: UpdateNewnessDto) {
    const newness = await this.find(updateNewnessDto._id);
    newness.title = updateNewnessDto.title;
    newness.description = updateNewnessDto.description;
    newness.image = updateNewnessDto.image;
    newness.updated_at = generateUnixTimestamp();
    return newness.save();
  }

  async delete(id: string) {
    const newness = await this.find(id);
    newness.deleted_at = generateUnixTimestamp();
    return newness.save();
  }
}
