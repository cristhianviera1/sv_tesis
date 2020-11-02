import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { generateUnixTimestamp } from '../../utils/generateUnixTimestamp';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {
  }

  find(conditions: FilterQuery<Product>) {
    return this.ProductModel.findOne({ ...conditions, deleted_at: null });
  }

  list() {
    return this.ProductModel.find({ deleted_at: null });
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct = new CreateProductDto(
      createProductDto.title,
      createProductDto.stock,
      createProductDto.category,
      createProductDto.price,
      createProductDto.detail,
      createProductDto.image,
    );
    return await this.ProductModel.create(newProduct);
  }

  async update(updateProductDto: UpdateProductDto) {
    const product = await this.ProductModel.findOne({ _id: updateProductDto._id });
    if (!product) {
      throw new NotFoundException('No se ha encontrado el producto');
    }
    product.title = updateProductDto.title;
    product.stock = updateProductDto.stock;
    product.category = updateProductDto.category;
    product.price = updateProductDto.price;
    product.detail = updateProductDto.detail;
    product.image = updateProductDto.image;
    await product.save();
    return product;
  }

  async delete(id: string) {
    const product = await this.ProductModel.findOne({ _id: id });
    if (!product) {
      throw new NotFoundException('No se ha encontrado el producto');
    }
    product.deleted_at = generateUnixTimestamp();
    return await product.save();
  }
}
