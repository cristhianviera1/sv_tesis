import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BranchOffice } from './schema/branch-office.schema';
import CreateBranchOfficeDto from './dto/create-branch-office.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import UpdateBranchOfficeDto from './dto/update-branch-office.dto';

@Injectable()
export class BranchOfficesService {
  constructor(@InjectModel(BranchOffice.name) private branchOffice: Model<BranchOffice>) {
  }


  async create(createBranchOffice: CreateBranchOfficeDto): Promise<BranchOffice> {
    await this.findIfExist({ $or: [{ email: createBranchOffice.email }, { name: createBranchOffice.name }] }, 'nombre o correo');
    const address = {
      first_address: createBranchOffice.first_address,
      second_address: createBranchOffice.second_address,
      country: createBranchOffice.country,
      state: createBranchOffice.state,
      city: createBranchOffice.city,
      latitude: createBranchOffice.latitude,
      longitude: createBranchOffice.longitude,
    };
    const newBranch = new CreateBranchOfficeDto(
      createBranchOffice.name,
      createBranchOffice.email,
      address,
    );
    const createdBranch = new this.branchOffice(newBranch);
    return createdBranch.save();
  }

  async find(id: string) {
    const branchOffice = await this.branchOffice.findOne({ _id: id, deleted_at: null });
    if (!branchOffice) {
      throw new NotFoundException('No se ha encontrado la sucursal con el id proporcionado');
    }
    return branchOffice;
  }

  async findWithEmployee(id: string) {
    const branchOffice = await this.branchOffice.findOne({ 'employees._id': id, deleted_at: null });
    if (!branchOffice) {
      throw new NotFoundException('No se ha encontrado una sucursal asociada al usuario');
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

  async findIfExist(conditions: FilterQuery<BranchOffice>, propName: string) {
    const existBranch = await this.branchOffice.findOne({
      ...conditions,
      deleted_at: null,
    });
    if (existBranch) {
      throw new ConflictException(`Ya existe una sucursal con ese ${propName}`);
    }
  }

  async update(updateBranchOffice: UpdateBranchOfficeDto) {
    const branchOffice = await this.find(updateBranchOffice._id);
    if (branchOffice.name !== updateBranchOffice.name) {
      await this.findIfExist({ name: updateBranchOffice.name }, 'nombre');
    }
    if (branchOffice.email !== updateBranchOffice.email) {
      await this.findIfExist({ email: updateBranchOffice.email }, 'email');
    }
    branchOffice.name = updateBranchOffice.name;
    branchOffice.email = updateBranchOffice.email;
    branchOffice.address = {
      first_address: updateBranchOffice.first_address,
      second_address: updateBranchOffice.second_address,
      country: updateBranchOffice.country,
      state: updateBranchOffice.state,
      city: updateBranchOffice.city,
      latitude: updateBranchOffice.latitude,
      longitude: updateBranchOffice.longitude,
    };
    branchOffice.updated_at = generateUnixTimestamp();
    return branchOffice.save();
  }

  async updateStatus(status: boolean, id: string) {
    const branchOffice = await this.find(id);
    branchOffice.status = status;
    return branchOffice.save();
  }

  getSafeParameteres(branchOffice: BranchOffice): BranchOffice {
    return {
      ...branchOffice.toObject(),
      employees: null,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    } as BranchOffice;
  }

}
