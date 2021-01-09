export default class CreateProductDto {
    _id: string;
    name: string;
    stock: number;
    status: boolean;
    price: number;
    detail: string;
    image: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    constructor(name: string, stock: number, price: number, detail: string, image: string);
}
