import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('promo')
@ApiBearerAuth('access-token')
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Yangi promo yaratish' })
  @ApiBody({ type: CreatePromoDto })
  create(@Body() createPromoDto: CreatePromoDto) {
    return this.promoService.create(createPromoDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get()
  @ApiOperation({ summary: 'Barcha promolarni olish' })
  findAll() {
    return this.promoService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get(':id')
  @ApiOperation({ summary: 'Bitta promo olish' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.promoService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Promo yangilash' })
  update(@Param('id') id: string, @Body() updatePromoDto: UpdatePromoDto) {
    return this.promoService.update(+id, updatePromoDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Promo o‘chirish' })
  remove(@Param('id') id: string) {
    return this.promoService.remove(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('use')
  @ApiOperation({ summary: 'Promo kodni ishlatish' })
  usePromo(
    @Body() body: { userId: number; promoCode: string; prodoct_id: number }
  ) {
    const { userId, promoCode, prodoct_id } = body;
    return this.promoService.usePromo(userId, promoCode, prodoct_id);
  }
}
