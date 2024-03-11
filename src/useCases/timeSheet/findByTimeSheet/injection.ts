import { FindOneTimeSheetRepository } from "../../../../prisma/repositories/timeSheetRepository";
import { FindEmployeeTimeSheetService } from "./findEmployeeTimeSheetService";
import { ControllerFindByEmployeeTimeSheet } from "./controllerFindByEmpoyee";



const findOneTimeSheetRepository = new FindOneTimeSheetRepository()

const findEmployeeTimeSheetService = new FindEmployeeTimeSheetService(findOneTimeSheetRepository)
const controllerFindByEmployeeTimeSheet = new ControllerFindByEmployeeTimeSheet(findEmployeeTimeSheetService)

export { controllerFindByEmployeeTimeSheet }

