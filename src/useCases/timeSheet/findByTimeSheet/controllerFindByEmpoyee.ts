import { Request, Response } from 'express';
import { FindEmployeeTimeSheetService } from './findEmployeeTimeSheetService';

export class ControllerFindByEmployeeTimeSheet {
  constructor(
    private findEmployeeTimeSheetService: FindEmployeeTimeSheetService,
  ) {}
  async findTimeSheet(req: Request, res: Response) {
    if (!req.cookies.securityData) {
      return res.status(500).json({ data: 'sem securityData' });
    }
    console.log(req.cookies.securityData);
    
    const { time_sheet_id } = req.cookies.securityData;

    try {
      const timeSheetEmployee =
        await this.findEmployeeTimeSheetService.execute(time_sheet_id);
      return res
        .status(200)
        .cookie('securityData', req.cookies.securityData, {
          httpOnly: true,
          secure: true,
          maxAge:5*60*1000,
          sameSite:'strict'
        })
        .json({ timeSheetEmployee });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
