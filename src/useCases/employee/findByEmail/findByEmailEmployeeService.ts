import { apiError } from "../../../shared/middlewares/AppError";
import { IFindByEmailRepository } from "../../../shared/interfaces/IEmployeeRepository";
export class FindByEmailEmployeeService {
  constructor(private employeeRepository: IFindByEmailRepository) {}

  async execute(email: string) {
    try {
      const employee =
        (await this.employeeRepository.findByEmail(email));
      return employee;
    } catch (error) {
      throw new apiError("erro interno find service email", 500);
    }
  }
}
