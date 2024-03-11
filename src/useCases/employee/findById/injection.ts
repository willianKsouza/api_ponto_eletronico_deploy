import { FindByIdEmpoyeeService } from "./findByIdEmployeeService";
import { FindByIdRepository } from "../../../../prisma/repositories/userRepository";
import { ControllerFindByIdEmployee } from "./ControllerFindByIdEmpoyee";

const findByIdRepository = new FindByIdRepository();
const findByIdEmpoyeeService = new FindByIdEmpoyeeService(
  findByIdRepository
);
const controllerFindByIdEmployee = new ControllerFindByIdEmployee(
  findByIdEmpoyeeService
);

export { controllerFindByIdEmployee };
