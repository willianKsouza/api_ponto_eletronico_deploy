import { IFindByEmailRepository } from "../../shared/interfaces/IEmployeeRepository";
import { compareSync } from "bcrypt";
import { IUser } from "../../shared/interfaces/IUser";
import { apiError } from "../../shared/middlewares/AppError";
import { sign } from "jsonwebtoken";

export class LoginEmployeeService {
  constructor(private employee: IFindByEmailRepository) {}
  async execute({ email, password }: Pick<IUser, "email" | "password">) {
    const employeeCredentials = await this.employee.findByEmail(email)
    if (!employeeCredentials) {
      throw new apiError("email incorreto", 404);
    }
    
    
    const compareHash = compareSync(
      password,
      employeeCredentials.password
    );
      
    if (compareHash) {
      const token = sign(
        { user: JSON.stringify(employeeCredentials) },
        process.env.SECRET as string,
        {
          expiresIn: 9000,
        }
      );
      return {
        auth: true,
        token,
        employee_id:employeeCredentials.employee_id,
        time_sheet_id:employeeCredentials.last_register_time_sheet,
        function_employee:employeeCredentials.function_employee
      };
    } else {
      throw new apiError("senha incorreta", 404);
    }
  }
}
