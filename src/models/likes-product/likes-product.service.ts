import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../products/entities/product.entity';
import { Like } from './entities/likes-product.entity';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Like)
        private likeModel: typeof Like
    ) { }

    async likeProduct(userId: number, productId: number) {
        const existing = await this.likeModel.findOne({ where: { user_id: userId, product_id: productId } });
        if (existing) return { message: 'Mahsulot allaqachon like qilingan' };

        return this.likeModel.create({ user_id: userId, product_id: productId });
    }

    async unlikeProduct(userId: number, productId: number) {
        const existing = await this.likeModel.findOne({ where: { user_id: userId, product_id: productId } });
        if (!existing) throw new NotFoundException('Mahsulot like qilingan emas');

        await existing.destroy();
        return { message: 'Mahsulot unlike qilindi' };
    }

    async getUserLikes(userId: number) {
        return this.likeModel.findAll({
            where: { user_id: userId },
            include: [Product],
        });
    }
}
