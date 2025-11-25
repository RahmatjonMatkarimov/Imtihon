import { ApiProperty } from '@nestjs/swagger';

class MonthStatDto {
  @ApiProperty({ example: 1 })
  month: number;

  @ApiProperty({ example: 10 })
  joined: number;

  @ApiProperty({ example: 2 })
  left: number;
}

export class ReportResponseDto {
  @ApiProperty({ example: 120, description: 'Umumiy talabalar soni' })
  totalStudents: number;

  @ApiProperty({ example: 10, description: 'Umumiy o‘qituvchilar soni' })
  totalTeachers: number;

  @ApiProperty({ example: 5, description: 'Umumiy guruhlar soni' })
  totalGroups: number;

  @ApiProperty({ example: 3, description: 'Joriy oyda ketgan talabalar soni' })
  leftThisMonth: number;

  @ApiProperty({ type: [MonthStatDto], description: 'Har oyga bo‘lgan qo‘shilish va ketish statistikasi' })
  months: MonthStatDto[];
}
