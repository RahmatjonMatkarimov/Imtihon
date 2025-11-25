import { BotsService } from './bots.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';

import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';

@Controller('requests')
export class BotsController {
    constructor(private readonly botsService: BotsService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get()
    async requests(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('search') search: string,
    ) {
        return this.botsService.requests(page, pageSize, search);
    }

}
