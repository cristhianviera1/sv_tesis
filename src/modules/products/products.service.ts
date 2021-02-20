import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';
import CreateProductDto from './dto/create-product.dto';
import {generateUnixTimestamp} from '../../utils/generateUnixTimestamp';
import UpdateProductDto from './dto/update-product.dto';
import {Product} from './schema/product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private ProductModel: Model<Product>,
    ) {
    }

    async findById(id: string) {
        const product = await this.findOne({_id: id});
        if (!product) {
            throw new NotFoundException('No se ha encontrado el producto con el id proporcionado');
        }
        return product;
    }

    async findOne(conditions: FilterQuery<Product>) {
        return this.ProductModel.findOne(conditions);
    }

    async list(conditions: FilterQuery<Product>) {
        return this.ProductModel.find(conditions);
    }

    async create(createProductDto: CreateProductDto) {
        const newProduct = new CreateProductDto(
            createProductDto.name,
            createProductDto.stock,
            createProductDto.price,
            createProductDto.detail,
            createProductDto.image,
            createProductDto.status
        );
        return await this.ProductModel.create(newProduct);
    }

    async update(updateProductDto: UpdateProductDto) {
        const product = await this.findById(updateProductDto._id);
        product.name = updateProductDto.name;
        product.stock = updateProductDto.stock;
        product.price = updateProductDto.price;
        product.detail = updateProductDto.detail;
        product.image = updateProductDto.image;
        product.status = updateProductDto.status;

        return await product.save();
    }

    async delete(id: string) {
        const product = await this.findById(id);
        product.deleted_at = generateUnixTimestamp();
        await product.save();
        return true;
    }

    async changeStock(id: string, quantity: number, add: boolean) {
        const product = await this.findById(id);
        add ? product.stock += quantity : product.stock -= quantity;
        await product.save();
        return true;
    }

    getSafeParameters(product: Product): Product {
        return {
            ...product.toObject(),
            stock: undefined,
            status: undefined,
            created_at: undefined,
            updated_at: undefined,
            deleted_at: undefined,
        } as Product;
    }
}
