import { Request, Response } from "express";
import { UpdateEmployeeService } from "./updateEmployeeService";

export class ControllerUpdateEmployee {
  constructor(private updateEmployee: UpdateEmployeeService) {}
  async update(req: Request, res: Response) {
    const {
      name_employee,
      function_employee,
      workload_employee,
      email,
    } = req.body;

    try {
      const { employee_id, isAdm } = req.cookies.securityData;
      
      
      const employee = await this.updateEmployee.execute({
        employee_id,
        name_employee,
        function_employee,
        workload_employee,
        email,
      });

      return res.status(200).json({ data: employee });
    } catch (error) {
      
     return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
