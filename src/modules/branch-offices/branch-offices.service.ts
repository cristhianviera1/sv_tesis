import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchOffice } from './schema/branch-office.schema';
import CreateBranchOfficeDto from './dto/create-branch-office.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import UpdateBranchOfficeDto from './dto/update-branch-office.dto';

@Injectable()
export class BranchOfficesService {
  constructor(@InjectModel(BranchOffice.name) private branchOffice: Model<BranchOffice>) {
  }


  create(createBranchOffice: CreateBranchOfficeDto): Promise<BranchOffice> {
    const createdBranch = new this.branchOffice(createBranchOffice);
    return createdBranch.save();
  }

  async find(id: string) {
    const branchOffice = await this.branchOffice.findOne({ _id: id, deleted_at: null });
    if (!branchOffice) {
      throw new NotFoundException('No se ha encontrado la sucursal con el id proporcionado');
    }
    return branchOffice;
  }

  async list() {
    const branchOffices = await this.branchOffice.find({ deleted_at: null });
    if (branchOffices?.length < 1) {
      throw new NotFoundException('No existen sucursales registradas');
    }
    return branchOffices;
  }

  async delete(id: string) {
    const branchOffice = await this.find(id);
    branchOffice.deleted_at = generateUnixTimestamp();
    return branchOffice.save();
  }

  async findIfExist(branchOffice: UpdateBranchOfficeDto) {
    const existBranch = await this.branchOffice.findOne({
      $or: [{ name: branchOffice.name }, { email: branchOffice.email }],
      deleted_at: null,
    });
    if (existBranch) {
      throw new ConflictException('Ya existe una sucursal con el mismo nombre o email');
    }
  }

  async update(updateBranchOffice: UpdateBranchOfficeDto) {
    const branchOffice = await this.find(updateBranchOffice._id);
    await this.findIfExist(updateBranchOffice);
    branchOffice.name = updateBranchOffice.name;
    branchOffice.email = updateBranchOffice.email;
    branchOffice.address = updateBranchOffice.address;
    branchOffice.updated_at = generateUnixTimestamp();
    return branchOffice.save();
  }

  async updateStatus(status: boolean, id: string) {
    const branchOffice = await this.find(id);
    branchOffice.status = status;
    return branchOffice.save();
  }


}
