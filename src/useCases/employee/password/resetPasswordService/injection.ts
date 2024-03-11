import { ResetPasswordService } from "./resetPasswordService";
import { FindByIdRepository, UpdateRepository, FindByTokenRepository } from "../../../../../prisma/repositories/userRepository";
import { ControllerResetPassword } from "./controllerResetPassword";



const updateRepository = new UpdateRepository();
const findByTokenRepository = new FindByTokenRepository();
const findByIdRepository = new FindByIdRepository();
const resetPasswordService = new ResetPasswordService(
  findByIdRepository,
  updateRepository,
  findByTokenRepository
);

const controllerResetPassword = new ControllerResetPassword(
  resetPasswordService
);

export { controllerResetPassword}