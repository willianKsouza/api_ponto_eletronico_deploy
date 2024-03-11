import { Router } from "express";
import { controllerForgotPassword } from "../../useCases/employee/password/sendEmailForgotPassword/injection";
import { controllerResetPassword } from "../../useCases/employee/password/resetPasswordService/injection";
import { controllerFormResetPassword } from "../../useCases/employee/password/formResetPasswordService/injection";
import { isValidUUID } from "../utils/isValidUUID";


const passwordRouter = Router();

passwordRouter.get("/forgot", (req, res) =>
  controllerForgotPassword.create(req, res)
);

passwordRouter.post("/reset", (req, res) =>
  controllerResetPassword.reset(req, res)
);
passwordRouter.get("/reset/:uuid", isValidUUID,(req, res) =>
  controllerFormResetPassword.formReset(req, res)
);
export { passwordRouter };
