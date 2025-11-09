export interface CreateProductDTO {
    name: string;
    description?: string;
    price: number;
    discount?: number;
    color?: string;
    size?: string;
    rating?: number;
    images: string[];
    user_id: number;
    category_id: number;
}
export interface UpdateProductDTO {
    name?: string;
    description?: string;
    price?: number;
    discount?: number;
    color?: string;
    size?: string;
    rating?: number;
    images?: string[];
    isLike?: boolean;
    isCard?: boolean;
}