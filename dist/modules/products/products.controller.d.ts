import { ProductsService } from './products.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(req: any, createProductDto: CreateProductDto): Promise<import("./schema/product.schema").Product>;
    list(): Promise<import("./schema/product.schema").Product[]>;
    find(id: any): Promise<import("./schema/product.schema").Product>;
    update(updateProductDto: UpdateProductDto): Promise<import("./schema/product.schema").Product>;
    delete(id: string): Promise<boolean>;
}
