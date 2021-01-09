export default class CreateNewnessDto {
    _id: string;
    title: string;
    description: string;
    image: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    constructor(title: string, description: string, image: string);
}
