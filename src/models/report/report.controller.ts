import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getStatics() {
    return await this.reportService.statics();
  }
}
