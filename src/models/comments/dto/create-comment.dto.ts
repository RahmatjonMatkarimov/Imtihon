import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'Comment text is required' })
    comment: string;

    @IsInt({ message: 'User ID must be an integer' })
    user_id: number;

    @IsInt({ message: 'Product ID must be an integer' })
    product_id: number;

    @IsInt({ message: 'Rating must be an integer' })
    @Min(1, { message: 'Rating must be at least 1' })
    @Max(5, { message: 'Rating cannot exceed 5' })
    rating: number;
}
