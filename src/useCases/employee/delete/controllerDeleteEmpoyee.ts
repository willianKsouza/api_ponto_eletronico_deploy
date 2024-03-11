import { Request, Response } from "express";
import { DeleteEmployeeService } from "./deleteEmployeeService";

export class ControllerDeleteEmployee {
  constructor(private deleteEmployee: DeleteEmployeeService) {}
  async delete(req: Request, res: Response) {
    try {
      const { employee_id } = req.cookies.securityData;
      const employee = await this.deleteEmployee.execute(employee_id);
      return res.status(200).json({employee });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
