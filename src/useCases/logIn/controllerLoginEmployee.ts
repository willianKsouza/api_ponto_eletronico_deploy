import { Request, Response } from "express";
import { LoginEmployeeService } from "./loginEmployeeService";



export class ControllerLoginEmployee {
  constructor(private loginEmployee: LoginEmployeeService) { }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { auth, token, employee_id, time_sheet_id, function_employee, name_employee } = await this.loginEmployee.execute({
        email,
        password,
      });

      return res
        .setHeader('auth',`${auth}`)
        .setHeader('token', `${token}`)
        .setHeader('employee_id',`${employee_id}`)
        .setHeader('time_sheet_id', `${time_sheet_id}`)
        .setHeader('function_employee', `${function_employee}`)
        .setHeader('name_employee', `${name_employee}`)
        .setHeader('email', `${email}`)
        .status(200)
        .json({ auth, token, employee_id, time_sheet_id });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
