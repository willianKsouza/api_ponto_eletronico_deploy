import { IDataMark } from "../../../shared/interfaces/IDataMark";

import {
  ICreateTimeSheetRepository,
  IFindOneTimeSheetRepository,
  ITimeSheetUpdateRepository,
} from "../../../shared/interfaces/ITimeSheetRepository";
import { IUpdateRepository } from "../../../shared/interfaces/IEmployeeRepository";
import { apiError } from "../../../shared/middlewares/AppError";
import { calcOfHours } from "../../../shared/utils/calcOfHours";


export class TimeSheetService {
  constructor(
    private timeSheet: IFindOneTimeSheetRepository,
    private timeSheetUpdate: ITimeSheetUpdateRepository,
    private timeSheetCreate: ICreateTimeSheetRepository,
    private employeeUpdateRepository: IUpdateRepository
  ) { }
  async execute(data: IDataMark) {
    const {
      current_time_stamp,
      time_sheet_id,
      employee_id,
      type_marking,
      work_load,
    } = data;
    // "createdAt": "2024-02-05T21:49:33.630Z",

    /*causo time_sheet_id venha nulo do body, ele sera '0', fazendo 
      assim a varialvel timeSheet ser null e cair no else para criar o primeiro registro*/
    const sheetID = time_sheet_id ?? '0';

    const timeSheet = await this.timeSheet.findOne(sheetID);


    if (timeSheet && time_sheet_id) {
      switch (type_marking) {
        case "launch_in":
          if (!timeSheet.launch_in) {
            try {
              const employeeTimeSheet = await this.timeSheetUpdate.update(time_sheet_id, {
                launch_in: current_time_stamp,
              });
              return employeeTimeSheet;
            } catch (error) {
              throw new apiError(error.message, 400);
            }
          }
        case "launch_out":
          if (!timeSheet.launch_out) {


            try {
              const employeeTimeSheet = await this.timeSheetUpdate.update(
                time_sheet_id,
                {
                  launch_out: current_time_stamp,
                }
              );
              return employeeTimeSheet;
            } catch (error) {
              throw new apiError(error.message, 400);
            }
          }
        case "out_time":

          if (!timeSheet.out_time) {
            try {
              const employeeTimeSheet = await this.timeSheetUpdate.update(
                time_sheet_id,
                {
                  out_time: current_time_stamp,
                }
              );
             
                if (employeeTimeSheet) {
                  const results = calcOfHours(employeeTimeSheet);
                  await this.timeSheetUpdate.update(
                    time_sheet_id,
                    {
                      hours_worked: results.hoursWorked,
                      owed_hours: results.owedHours,
                      overtime: results.overTime,
                    }
                  );
                }
              await this.employeeUpdateRepository.update(employee_id, {
                last_register_time_sheet: 'null'
              })
              return employeeTimeSheet;
            } catch (error) {
              throw new apiError(error.message, 400);
            }
          }
      }
    } else {
      try {
        const employeeTimeSheet = await this.timeSheetCreate.create({
          employee_id: employee_id,
          work_load: work_load,
          in_time: current_time_stamp,
        });
        await this.employeeUpdateRepository.update(employee_id, {
          last_register_time_sheet: employeeTimeSheet?.time_sheet_id
        })
        return employeeTimeSheet?.time_sheet_id;

      } catch (error) {
        throw new apiError(error.messagem, 400);
      }
    }
  }
}
