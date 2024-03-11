import { Request, Response } from "express";
import { TimeSheetService } from "./timeSheetService";

export class ControllerTimeSheet {
  constructor(private sheetService: TimeSheetService) { }
  async mark(req: Request, res: Response) {

    
    let cookies = req.cookies.securityData
    
    
    const {
      current_time_stamp,
      type_marking,
      work_load,
    } = req.body;
    

    const { time_sheet_id, employee_id } = req.cookies.securityData
    
    try {
      const timeSheetService = await this.sheetService.execute({
        current_time_stamp,
        employee_id,
        time_sheet_id,
        type_marking,
        work_load,
      });
      if (typeof timeSheetService == 'string') {
          cookies.time_sheet_id = timeSheetService 
      }
      if (type_marking == 'out_time') {
        cookies.time_sheet_id = ''
      }
      return res

        .cookie("securityData", cookies, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        })
        .status(200)
        .json({ timeSheetService });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
