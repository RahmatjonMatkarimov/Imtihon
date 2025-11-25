import { AttendanceStatus } from "src/common/enums/AttendanceStatus";
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsArray, ValidateNested, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class AttendanceRecordDto {
    @ApiProperty({
        description: 'Talaba ID raqami',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    student_id: number;

    @ApiProperty({
        description: 'Davomat holati',
        enum: AttendanceStatus,
        example: AttendanceStatus.PRESENT,
    })
    @IsEnum(AttendanceStatus)
    @IsNotEmpty()
    status: AttendanceStatus;
}

export class CreateAttendanceDto {
    @ApiProperty({
        description: 'Davomat sanasi (YYYY-MM-DD formatida)',
        example: '2024-01-15',
    })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        description: 'Talabalar davomat yozuvlari',
        type: [AttendanceRecordDto],
        example: [
            { student_id: 1, status: 'PRESENT' },
            { student_id: 2, status: 'ABSENT' },
            { student_id: 3, status: 'LATE' },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttendanceRecordDto)
    records: AttendanceRecordDto[];
}