import {  FindByEmailRepository } from "../../../prisma/repositories/userRepository";
import { ControllerLoginEmployee } from "./controllerLoginEmployee";
import { LoginEmployeeService } from "./loginEmployeeService";

const findByEmailRepository = new FindByEmailRepository();
const loginEmployeeService = new LoginEmployeeService(findByEmailRepository);
const loginEmployeeController = new ControllerLoginEmployee(
  loginEmployeeService
);
export { loginEmployeeController };