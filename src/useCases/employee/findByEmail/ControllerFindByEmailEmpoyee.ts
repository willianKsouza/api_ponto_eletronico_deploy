import { Request, Response } from "express";
import { FindByEmailEmployeeService } from "./findByEmailEmployeeService";

export class ControllerFindByEmailEmployee {
  constructor(private findByEmailEmployee: FindByEmailEmployeeService) {}
  async findByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const employee = await this.findByEmailEmployee.execute(email);
      return res.status(200).json({ employee });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}