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

    const { time_sheet_id } = req.cookies.securityData;
    let cookies = req.cookies.securityData
    try {
      const timeSheetEmployee =
        await this.findEmployeeTimeSheetService.execute(time_sheet_id);
      return res
        .cookie('securityData', cookies, {
          httpOnly: true,
          secure: true,
          sameSite:"strict",
        })
        .status(200)
        .json({ timeSheetEmployee });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
