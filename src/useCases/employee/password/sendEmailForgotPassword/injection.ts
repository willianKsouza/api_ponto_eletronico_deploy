import { Email } from "../../../../data/email/sendEmail";
import { CreateUserToken, FindByEmailRepository } from "../../../../../prisma/repositories/userRepository";
import { ControllerForgotPassword } from "./controllerForgotPassword";
import { SendForgotEmailPasswordService } from "./sendEmailForgotPasswordService.ts";


const email = new Email()
const createUserToken = new CreateUserToken();
const findByEmailRepository = new FindByEmailRepository()
const sendEmailForgotpassword = new SendForgotEmailPasswordService(
  findByEmailRepository,
  createUserToken,
  email
);
const controllerForgotPassword = new ControllerForgotPassword(
  sendEmailForgotpassword
);

export { controllerForgotPassword }
