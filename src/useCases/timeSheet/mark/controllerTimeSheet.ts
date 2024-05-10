import { Request, Response } from 'express';
import { TimeSheetService } from './timeSheetService';

export class ControllerTimeSheet {
  constructor(private sheetService: TimeSheetService) {}
  async mark(req: Request, res: Response) {
    const { current_time_stamp, type_marking, work_load } = req.body;

    const time_sheet_id = req.headers['time_sheet_id'] as string;
    const employee_id = req.headers['employee_id'] as string;

    try {
      const timeSheetService = await this.sheetService.execute({
        current_time_stamp,
        employee_id,
        time_sheet_id,
        type_marking,
        work_load,
      });
      if (typeof timeSheetService == 'string') {
        return res
          .header('time_sheet_id', `${timeSheetService}`)
          .status(200)
          .json({ timeSheetService });
      }
      return res.status(200).json('sucesso');
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
