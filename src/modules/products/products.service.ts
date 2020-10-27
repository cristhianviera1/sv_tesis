import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchOffice } from '../branch-offices/schema/branch-office.schema';
import { Product } from './product.model';
import CreateProductDto from './dto/create-product.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import UpdateProductDto from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(BranchOffice.name) private BranchOfficeModel: Model<BranchOffice>,
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
    await branchOffice.save();
    return branchOffice.products;
  }

  async update(updateProductDto: UpdateProductDto, branchOffice: BranchOffice) {
    const productIndex = branchOffice.products.findIndex((product) => product._id === updateProductDto._id);
    if (productIndex === -1) {
      throw new NotFoundException('No se ha encontrado el producto');
    }
    branchOffice.products[productIndex].name = updateProductDto.name;
    branchOffice.products[productIndex].stock = updateProductDto.stock;
    branchOffice.products[productIndex].category = updateProductDto.category;
    branchOffice.products[productIndex].price = updateProductDto.price;
    branchOffice.products[productIndex].detail = updateProductDto.detail;
    branchOffice.products[productIndex].image = updateProductDto.image;

    branchOffice.markModified('products');
    await branchOffice.save();
    return branchOffice.products[productIndex];
  }

  async delete(id:string, branchOffice: BranchOffice){
    const productIndex = branchOffice.products.findIndex((product)=>product._id == id);
    if(productIndex == -1){
      throw new NotFoundException("No se ha encontrado el producto");
    }
    branchOffice.products.splice(productIndex,1);
    branchOffice.markModified('products');
    await branchOffice.save()
    return branchOffice.products
  }
}
