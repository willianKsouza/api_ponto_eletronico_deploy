import { FindByFilterRepository } from "../../../../prisma/repositories/userRepository";
import { ControllerFindEmployeeByFilter } from "./controllerFindEmployeeByFilter";
import { FindEmployeeByFilterService } from "./findEmployeeByFilterService";




const findEmployeeByFilterRepository = new FindByFilterRepository()

const findEmployeeByFilterService = new FindEmployeeByFilterService(findEmployeeByFilterRepository)

const controllerFindEmployeeByFilter = new ControllerFindEmployeeByFilter(findEmployeeByFilterService)


export {controllerFindEmployeeByFilter }