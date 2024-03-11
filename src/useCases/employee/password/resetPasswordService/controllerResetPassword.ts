import { Request, Response } from "express";
import { ResetPasswordService } from "./resetPasswordService";


export class ControllerResetPassword {
  constructor(private resetPassword: ResetPasswordService) {}

  async reset(req: Request, res: Response) {
    const { token, password } = req.body;
    try {
      const resetPassword = await this.resetPassword.execute(token, password);
      return res.status(204).json({ data: resetPassword });
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
