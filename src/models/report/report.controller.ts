import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReportResponseDto } from './dto/report-response.dto';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Statistik ma’lumotlarni olish' })
  @ApiResponse({ status: 200, description: 'Statistik ma’lumotlar', type: ReportResponseDto })
  getStatics() {
    return this.reportService.statics();
  }
}
