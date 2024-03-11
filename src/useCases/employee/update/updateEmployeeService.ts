import { apiError } from "../../../shared/middlewares/AppError";
import {
  IFindByIdRepository,
  IUpdateRepository,
} from "../../../shared/interfaces/IEmployeeRepository";
import { UpdateDataValidation } from "../../../shared/utils/updateDataValidation";

interface IUpdateEmployee {
  employee_id: string;
  name_employee?: string;
  function_employee?: string;
  workload_employee?: number;
  email?: string;
}

export class UpdateEmployeeService {
  constructor(
    private employeeRepository: IUpdateRepository,
    private findEmployeeById: IFindByIdRepository
  ) {}

  @UpdateDataValidation()
  async execute(data: IUpdateEmployee) {
    try {
      const { email, function_employee, name_employee, workload_employee } =
        data;
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
