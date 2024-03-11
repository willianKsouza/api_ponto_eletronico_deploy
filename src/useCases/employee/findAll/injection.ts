import { FindAllRepository } from "../../../../prisma/repositories/userRepository";
import { ControllerFindAllEmployee } from "./controllerFindAllEmpoyee";
import { FindAllEmployeeService} from "./findAllEmployeeService";

const findAllRepository = new FindAllRepository();
const findAllEmployeeService = new FindAllEmployeeService(findAllRepository);
const findAllEmployeeController = new ControllerFindAllEmployee(
  findAllEmployeeService
);

export { findAllEmployeeController };
