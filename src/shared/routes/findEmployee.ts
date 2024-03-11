import { Router } from "express";
import { findByEmailEmployeeController } from "../../useCases/employee/findByEmail/injection";
import { controllerFindByIdEmployee } from "../../useCases/employee/findById/injection";

const findEmployee = Router();


findEmployee.post("/", (req, res) =>
  findByEmailEmployeeController.findByEmail(req, res)
);
findEmployee.get("/", (req, res) =>
controllerFindByIdEmployee.findById(req, res)
);
export { findEmployee };
