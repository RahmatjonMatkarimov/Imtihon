export class CreateProductDto {
    title: string;
    price: number;
    description: string;
    count: number;
    guaranteed: Date;
    attributes: any;
    owner_id: number;
    category_id: number;
}
