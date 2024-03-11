import { apiError } from "../../../../shared/middlewares/AppError";
import {
  ICreateUserTokenRepository,
  IFindByEmailRepository,
} from "../../../../shared/interfaces/IEmployeeRepository";
import { ISendEmail } from "../../../../shared/interfaces/ISendEmail";

export class SendForgotEmailPasswordService {
  constructor(
    private employeeRepository: IFindByEmailRepository,
    private userToken: ICreateUserTokenRepository,
    private email: ISendEmail
  ) {}

  async execute(email: string) {
    try {
      const employee = await this.employeeRepository.findByEmail(email);
      if (!employee) {
        throw new apiError("Usuario nao encontrado", 500);
      }

      const token = await this.userToken.createUserToken(employee.employee_id);
      if (token) {
        await this.email.sendEmail(
          "equipetimesheet@api.com.br",
          email,
          "[API TIME SHEET]redefiniçao de senha",
          employee.name_employee,
          token.token
        );
      }
    } catch (error) {
      throw new apiError(error.message, 500);
    }
  }
}
