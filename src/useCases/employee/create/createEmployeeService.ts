import { ICreateRepository } from "../../../shared/interfaces/IEmployeeRepository";
import { hashSync } from "bcrypt";
import { apiError } from "../../../shared/middlewares/AppError";
import { Prisma } from "@prisma/client";

import { IUser } from "../../../shared/interfaces/IUser";
import { CreateDataValidation } from "../../../shared/utils/createDataValidation";
export class CreateEmployeeService {
  constructor(private employeeRepository: ICreateRepository) {}
  @CreateDataValidation()
  async execute(data: Omit<IUser, "employee_id">) {
   
    const saltRounds = 10;
    const hash = hashSync(data.password, saltRounds);
    try {
      const employee = await this.employeeRepository.create({
        ...data,
        password: hash,
      });

      return employee;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw JSON.stringify({
            erro: "usuario ja existe",
            statusCode: 400,
          });
        }
        console.log(error);
        
      }
      throw new apiError("erro interno, create service", 500);
    }
  }
}
