import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Newness } from './schema/newness.schema';
import { FilterQuery, Model } from 'mongoose';
import CreateNewnessDto from './dto/create-newness.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import UpdateNewnessDto from './dto/update-newness.dto';

@Injectable()
export class NewnessService {
  constructor(@InjectModel(Newness.name) private newnessModel: Model<Newness>) {
  }

  async create(createNewnessDto: CreateNewnessDto) {
    const newness = new CreateNewnessDto(
      createNewnessDto.title,
      createNewnessDto.description,
      createNewnessDto.image,
    );
    const createdNewness = await this.newnessModel.create(newness);
    return createdNewness.save();
  }

  async find(id: string) {
    const newness = await this.newnessModel.findOne({ _id: id, deleted_at: null });
    if (!newness) {
      throw new NotFoundException('No se encontró la novedad');
    }
    return newness;
  }

  async list(conditions: FilterQuery<Newness>) {
    const newnesses = await this.newnessModel.find(conditions).sort({ created_at: -1 });
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
