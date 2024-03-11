import { Request, Response } from "express";
import { LoginEmployeeService } from "./loginEmployeeService";



export class ControllerLoginEmployee {
  constructor(private loginEmployee: LoginEmployeeService) { }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { auth, token, employee_id, time_sheet_id, function_employee } = await this.loginEmployee.execute({
        email,
        password,
      });

      return res
        .cookie("securityData", {auth, token, employee_id, time_sheet_id, function_employee}, {
          httpOnly: true,
          secure: true,
          sameSite:'none'
        })
        .status(201)
        .json({ auth, token, employee_id, time_sheet_id });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
