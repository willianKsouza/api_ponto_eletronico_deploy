import { DeleteRepository } from "../../../../prisma/repositories/userRepository";
import { ControllerDeleteEmployee } from "./controllerDeleteEmpoyee";
import { DeleteEmployeeService} from "./deleteEmployeeService";

const deleteRepository = new DeleteRepository();
const deleteEmployeeService = new DeleteEmployeeService(deleteRepository);
const deleteEmployeeController = new ControllerDeleteEmployee(
  deleteEmployeeService
);

export { deleteEmployeeController };
