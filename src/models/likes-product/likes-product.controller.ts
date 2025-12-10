import { Controller, Post, Delete, Get, Body, Param, UseGuards } from '@nestjs/common';
import { LikeService } from './likes-product.service';
import { CreateLikesProductDto } from './dto/create-likes-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('likes')
@Controller('likes')
export class LikeController {
    constructor(private likeService: LikeService) { }

    @Post()
    @ApiOperation({ summary: 'Mahsulotni like qilish' })
    @ApiBody({ type: CreateLikesProductDto })
    @ApiResponse({ status: 201, description: 'Mahsulot like qilindi' })
    like(@Body() dto: CreateLikesProductDto) {
        return this.likeService.likeProduct(dto.user_id, dto.product_id);
    }

    @Delete()
    @ApiOperation({ summary: 'Mahsulot like ni olib tashlash' })
    @ApiBody({ type: CreateLikesProductDto })
    @ApiResponse({ status: 200, description: 'Mahsulot unlike qilindi' })
    unlike(@Body() dto: CreateLikesProductDto) {
        return this.likeService.unlikeProduct(dto.user_id, dto.product_id);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Foydalanuvchining like qilgan mahsulotlari' })
    @ApiParam({ name: 'userId', example: 1 })
    @ApiResponse({ status: 200, description: 'Like qilingan mahsulotlar ro‘yxati' })
    getUserLikes(@Param('userId') userId: string) {
        return this.likeService.getUserLikes(+userId);
    }
}
