import { FilterQuery, Model } from 'mongoose';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { Product } from './schema/product.schema';
export declare class ProductsService {
    private ProductModel;
    constructor(ProductModel: Model<Product>);
    findById(id: string): Promise<Product>;
    findOne(conditions: FilterQuery<Product>): Promise<Product>;
    list(conditions: FilterQuery<Product>): Promise<Product[]>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(updateProductDto: UpdateProductDto): Promise<Product>;
    delete(id: string): Promise<boolean>;
    getSafeParameters(product: Product): Product;
}
