import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchOffice } from '../branch-offices/schema/branch-office.schema';
import { Product } from './product.model';
import CreateProductDto from './dto/create-product.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(BranchOffice.name) private branchOffice: Model<BranchOffice>,
  ) {
  }

  async create(createProductDto: CreateProductDto, branchOffice: BranchOffice) {
    branchOffice.products.push(
      new Product(
        createProductDto.name,
        createProductDto.stock,
        createProductDto.category,
        createProductDto.price,
        createProductDto.detail,
        createProductDto.image,
        true,
        generateUnixTimestamp(),
        generateUnixTimestamp(),
      ),
    );
    this.branchOffice.save();
    return branchOffice.products;
  }


}
