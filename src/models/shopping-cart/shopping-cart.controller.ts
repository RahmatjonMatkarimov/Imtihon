import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('cart')
export class ShoppingCartController {
    constructor(private cartService: ShoppingCartService) {}

    @Get(':userId')
    getCart(@Param('userId') userId: string) {
        return this.cartService.getUserCart(+userId);
    }

    @Post()
    addToCart(@Body() body: { userId: number; productId: number }) {
        return this.cartService.addToCart(body.userId, body.productId);
    }

    @Delete()
    removeFromCart(@Body() body: { userId: number; productId: number }) {
        return this.cartService.removeFromCart(body.userId, body.productId);
    }
}
