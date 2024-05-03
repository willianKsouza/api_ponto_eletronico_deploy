import { Request, Response } from "express";
import { FindByIdEmpoyeeService } from "./findByIdEmployeeService";

export class ControllerFindByIdEmployee {
  constructor(private findByIdEmpoyee: FindByIdEmpoyeeService) {}
  async findById(req: Request, res: Response) {
    try {
      if (!req.headers['employee_id']) {
        return res.status(401).json({ data: 'sem employee_id' });
      }
      const employee_id = req.headers['employee_id'] as string

      const employee = await this.findByIdEmpoyee.execute(employee_id);
      return res.status(200).json({ employee });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}