import { apiError } from "../../../shared/middlewares/AppError";
import {
  IFindByIdRepository,
  IUpdateRepository,
} from "../../../shared/interfaces/IEmployeeRepository";
import { UpdateDataValidation } from "../../../shared/utils/updateDataValidation";
import { IUpdateEmployee } from "../../../shared/interfaces/IUpdateEmployee";



export class UpdateEmployeeService {
  constructor(
    private employeeRepository: IUpdateRepository,
    private findEmployeeById: IFindByIdRepository
  ) {}


  async execute(data: IUpdateEmployee) {
    try {
      const { email, function_employee, name_employee, workload_employee } =
        data;
        UpdateDataValidation(data)
        if (function_employee == 'adm') {
          const employeeExists = await this.findEmployeeById.findById(data.employee_id);
          if (employeeExists) {
          const employee = await this.employeeRepository.update(data.employee_id, {
            email,
            function_employee,
            name_employee,
            workload_employee,
          });
          return employee;
        }
      }
      throw new apiError("erro ao atualizar", 400);
    } catch (error) {
      throw new apiError("erro update service", 500);
    }
  }
}
