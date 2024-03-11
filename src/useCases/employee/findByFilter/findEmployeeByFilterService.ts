import { apiError } from "../../../shared/middlewares/AppError";
import { IFindEmployeeByFilterRepository } from "../../../shared/interfaces/IEmployeeRepository";
import { IFilterEmployee } from "../../../shared/interfaces/IFilterEmployee";
export class FindEmployeeByFilterService {
  constructor(
    private employeeRepository: IFindEmployeeByFilterRepository,
  ) { }

  async execute(data: IFilterEmployee) {
    try {
      const employee = await this.employeeRepository.findByFilter(data);
      return employee;
    } catch (error) {
      throw new apiError("erro interno ao lista funcionarios", 500);
    }
  }
}