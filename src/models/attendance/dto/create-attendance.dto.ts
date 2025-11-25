import { AttendanceStatus } from "src/common/enums/AttendanceStatus";

export class CreateAttendanceDto {
    date: string;
    records: {
        student_id: number;
        status: AttendanceStatus
    }[]
}
