
import { z } from "zod";
import { apiError } from "../middlewares/AppError";

export function CreateDataValidation() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    
    
    descriptor.value = function (...args: any) {
      const createEmployeeSchema = z.object({
        name_employee: z.string().min(2).toLowerCase(),
        function_employee: z.string().toLowerCase(),
        workload_employee: z.literal(8),
        email: z
          .string()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          .toLowerCase(),
        password: z.string().min(3),
      });
      const resultValidator = createEmployeeSchema.safeParse(args[0]);

      if (resultValidator.success) {
        return originalMethod.apply(this, [resultValidator.data]);
      } else {
        const zodIssues = resultValidator.error.issues.map((i) => {
           
          return {
            [i.path[0]]: i.message,
          };
        });
        
        throw new apiError(JSON.stringify(zodIssues[0]), 500);

          
        // throw JSON.stringify({
        //   zodIssues,
        // });
      }
    };

    return descriptor;
  };
}
