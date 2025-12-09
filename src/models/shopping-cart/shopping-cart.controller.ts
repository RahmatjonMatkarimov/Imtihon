import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Shopping Cart')
@Controller('cart')
export class ShoppingCartController {
    constructor(private cartService: ShoppingCartService) { }

    @Get(':userId')
    @ApiOperation({ summary: 'Foydalanuvchi savatini olish' })
    @ApiParam({ name: 'userId', type: Number })
    getCart(@Param('userId', ParseIntPipe) userId: number) {
        return this.cartService.getUserCart(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Mahsulotni savatga qo‘shish' })
    @ApiBody({ type: CreateShoppingCartDto })
    addToCart(@Body() body: CreateShoppingCartDto) {
        return this.cartService.addToCart(body.user_id, body.product_id);
    }

    @Delete()
    @ApiOperation({ summary: 'Mahsulotni savatdan o‘chirish' })
    @ApiBody({ type: CreateShoppingCartDto })
    removeFromCart(@Body() body: CreateShoppingCartDto) {
        return this.cartService.removeFromCart(body.user_id, body.product_id);
    }
}
