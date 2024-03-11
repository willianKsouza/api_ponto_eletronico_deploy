import { Request, Response } from "express";
import { SendForgotEmailPasswordService } from "./sendEmailForgotPasswordService.ts.js";

export class ControllerForgotPassword {
  constructor(
    private sendEmailForgotPassword: SendForgotEmailPasswordService
  ) {}

  async create(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const sendEmailForgotPassword =
          await this.sendEmailForgotPassword.execute(email);
        return res.status(204).json()
    } catch (error) {
        return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
