import { apiError } from "../../../shared/middlewares/AppError";
import { IFindByIdRepository } from "../../../shared/interfaces/IEmployeeRepository";

export class FindByIdEmpoyeeService {
  constructor(private employeeRepository: IFindByIdRepository) {}

  async execute(id: string) {
    try {
      const employee =
        await this.employeeRepository.findById(id);
      return employee;
    } catch (error) {
      throw new apiError("erro interno find service Id", 500);
    }
  }
}
