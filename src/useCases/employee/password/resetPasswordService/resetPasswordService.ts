import { apiError } from "../../../../shared/middlewares/AppError";
import { isAfter, addHours } from "date-fns";
import { hashSync } from "bcrypt";
import {
  IFindByTokenRepository,
  IFindByIdRepository,
  IUpdateRepository,
} from "../../../../shared/interfaces/IEmployeeRepository";
export class ResetPasswordService {
  constructor(
    private findByIdRepository: IFindByIdRepository,
    private employeeUpdateRepository: IUpdateRepository,
    private userToken: IFindByTokenRepository
  ) {}

  async execute(token: string, password: string) {
    try {
      const usertoken = await this.userToken.findByToken(token);
      if (!usertoken) {
        throw new apiError("token nao encontrado", 500);
      }
      const user = await this.findByIdRepository.findById(usertoken.employee_id);
      if (!user) {
        throw new apiError("Usuario nao encontrado", 500);
      }
      const tokenCreatedAt = usertoken.createdAt;
      const campareDate = addHours(tokenCreatedAt, 2);
      if (isAfter(Date.now(), campareDate)) {
        throw new apiError("token expirado", 400);
      }
      const saltRounds = 10;
      const hash = hashSync(password, saltRounds);

      await this.employeeUpdateRepository.update(user.employee_id, {
        password: hash,
      });
    } catch (error) {
      throw new apiError(error.message, 500);
    }
  }
}
