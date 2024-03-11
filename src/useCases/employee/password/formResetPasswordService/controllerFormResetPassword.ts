import { Request, Response } from "express";

export class ControllerFormResetPassword {
  async formReset(req: Request, res: Response) {
    res.render("formResetPassword.handlebars", {
      uuid:req.params.uuid
    });
  }
}
