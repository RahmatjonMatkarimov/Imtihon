import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { LikeService } from './likes-product.service';

@Controller('likes')
export class LikeController {
    constructor(private likeService: LikeService) {}

    @Post()
    like(@Body() body: { userId: number; productId: number }) {
        return this.likeService.likeProduct(body.userId, body.productId);
    }

    @Delete()
    unlike(@Body() body: { userId: number; productId: number }) {
        return this.likeService.unlikeProduct(body.userId, body.productId);
    }

    @Get(':userId')
    getUserLikes(@Param('userId') userId: string) {
        return this.likeService.getUserLikes(+userId);
    }
}
