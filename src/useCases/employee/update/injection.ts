import {
  UpdateRepository,
  FindByIdRepository,
} from "../../../../prisma/repositories/userRepository";
import { ControllerUpdateEmployee } from "./controllerUpdateEmpoyee";
import { UpdateEmployeeService } from "./updateEmployeeService";

const updateRepository = new UpdateRepository();
const findByRepository = new FindByIdRepository();
const updateEmployeeService = new UpdateEmployeeService(
  updateRepository,
  findByRepository
);
const updateEmployeeController = new ControllerUpdateEmployee(
  updateEmployeeService
);

export { updateEmployeeController };
