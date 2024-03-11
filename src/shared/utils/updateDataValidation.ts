import { z } from "zod";

export function UpdateDataValidation() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any) {
      const createEmployeeSchema = z.object({
        queryId:z.string().toLowerCase(),
        name_employee: z.optional(z.string().min(2).toLowerCase()),
        function_employee: z.optional(z.string().toLowerCase()),
        workload_employee: z.optional(z.literal(8)),
        email: z.optional(
          z
            .string()
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            .toLowerCase()
        ),
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

        throw JSON.stringify({
          validation: false,
          zodIssues,
        });
      }
    };

    return descriptor;
  };
}
