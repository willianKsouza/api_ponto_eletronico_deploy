import { Request, Response } from 'express';
import { FindEmployeeTimeSheetService } from './findEmployeeTimeSheetService';

export class ControllerFindByEmployeeTimeSheet {
  constructor(
    private findEmployeeTimeSheetService: FindEmployeeTimeSheetService,
  ) {}
  async findTimeSheet(req: Request, res: Response) {
    if (!req.headers['time_sheet_id']) {
      return res.status(401).json({ data: 'sem time_sheet_id' });
    }
 
    try {
      const time_sheet_id = req.headers['time_sheet_id'] as string
      const timeSheetEmployee =
        await this.findEmployeeTimeSheetService.execute(time_sheet_id);
      return res
        .status(200)
        .json({ timeSheetEmployee });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
