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
    paymentType?: 'cash' | 'onlinePay';
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
    paymentType?: 'cash' | 'onlinePay';
    isLike?: boolean;
    isCard?: boolean;
}