
import { z } from "zod";
import { apiError } from "../middlewares/AppError";
import { IUser } from "../interfaces/IUser";

export function CreateDataValidation(payload: Omit<IUser, "employee_id">) {
  const createEmployeeSchema = z.object({
    name_employee: z.string().min(2).toLowerCase(),
    function_employee: z.string().toLowerCase(),
    workload_employee: z.literal(8),
    email: z
      .string()
      .email()
      .toLowerCase(),
    password: z.string().min(3),
  });
  const resultValidator = createEmployeeSchema.safeParse(payload);

  if (resultValidator.success) {
    return 
  } else {
    const zodIssues = resultValidator.error.issues.map((i) => {
       
      return {
        [i.path[0]]: i.message,
      };
    });
    
    throw new apiError(JSON.stringify(zodIssues[0]), 500);

  }
}
