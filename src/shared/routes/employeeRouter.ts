import { Router } from "express";
import { createEmployeeController } from "../../useCases/employee/create/injection";
import { updateEmployeeController } from "../../useCases/employee/update/injection";
import { deleteEmployeeController } from "../../useCases/employee/delete/injection";
import { findAllEmployeeController } from "../../useCases/employee/findAll/injection";
import { isAuthJWT } from "../middlewares/isAuthJWT";
import { isAuthADM } from "../middlewares/isAuthADM";

const employeeRouter = Router();

employeeRouter.post("/", (req, res) =>
  createEmployeeController.create(req, res)
);
employeeRouter.put("/:id", isAuthJWT, (req, res) =>
  updateEmployeeController.update(req, res)
);
employeeRouter.delete("/", (req, res) =>
  deleteEmployeeController.delete(req, res)
);
employeeRouter.get("/", (req, res) =>
  findAllEmployeeController.findAll(req, res)
);

export { employeeRouter };
