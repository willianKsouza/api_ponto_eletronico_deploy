import { Request, Response } from "express";
import { FindAllEmployeeService } from "./findAllEmployeeService";

export class ControllerFindAllEmployee {
  constructor(private findAllEmployee: FindAllEmployeeService) {}
  async findAll(req: Request, res: Response) {
    try {
      const employee = await this.findAllEmployee.execute();
      return res.status(200).json({ employee });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}