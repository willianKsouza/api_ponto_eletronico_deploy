import { apiError } from "../../../shared/middlewares/AppError";
import { IFindAllRepository } from "../../../shared/interfaces/IEmployeeRepository";
export class FindAllEmployeeService {
  constructor(
    private employeeRepository: IFindAllRepository,
  ) {}

  async execute() {
    try {
      const employee = await this.employeeRepository.findAll();
      return employee;
    } catch (error) {
      throw new apiError("erro interno ao lista funcionarios", 500);
    }
  }
}
