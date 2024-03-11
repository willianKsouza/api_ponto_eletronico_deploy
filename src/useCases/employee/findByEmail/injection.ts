import { FindByEmailRepository } from "../../../../prisma/repositories/userRepository";
import { ControllerFindByEmailEmployee } from "./ControllerFindByEmailEmpoyee";
import { FindByEmailEmployeeService } from "./findByEmailEmployeeService";

const findByEmailRepository = new FindByEmailRepository();
const findByEmailEmployeeService = new FindByEmailEmployeeService(
  findByEmailRepository
);
const findByEmailEmployeeController = new ControllerFindByEmailEmployee(
  findByEmailEmployeeService
);

export { findByEmailEmployeeController };
