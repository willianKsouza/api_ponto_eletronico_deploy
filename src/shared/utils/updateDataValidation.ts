import { z } from "zod";
import { IUpdateEmployee } from "../interfaces/IUpdateEmployee";

export function UpdateDataValidation(payload: IUpdateEmployee) {
  const createEmployeeSchema = z.object({
    queryId:z.string().toLowerCase(),
    name_employee: z.optional(z.string().min(2).toLowerCase()),
    function_employee: z.optional(z.string().toLowerCase()),
    workload_employee: z.optional(z.literal(8)),
    email: z.optional(
      z
        .string()
        .email()
        .toLowerCase()
    ),
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

    throw JSON.stringify({
      validation: false,
      zodIssues,
    });
  }
};




