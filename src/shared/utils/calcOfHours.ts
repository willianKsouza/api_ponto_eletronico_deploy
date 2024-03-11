import { ITimesheet } from "../interfaces/ITimeSheet";

function calcOfHours(sheet: ITimesheet) {
  const hoursWorked =
    sheet.launch_in!.getHours() -
    sheet.in_time!.getHours() +
    sheet.out_time!.getHours() -
    sheet.launch_out!.getHours();

  const owedHours = sheet.work_load - hoursWorked;

  const overTime = hoursWorked - sheet.work_load;
  return {
    hoursWorked,
    owedHours,
    overTime,
  };
}


export { calcOfHours }
