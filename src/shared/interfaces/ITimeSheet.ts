export interface ITimesheet {
  time_sheet_id: string;
  in_time?: Date | null;
  launch_in?: Date | null;
  launch_out?: Date | null;
  out_time?: Date | null;
  owed_hours?: number | null;
  work_load: number;
  hours_worked?: number | null;
  overtime?: number | null;
  createdAt?: Date | string;
  employee_id: string;
}
