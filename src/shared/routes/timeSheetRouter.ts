
import { Router } from "express";
import { controllerTimeSheet } from "../../useCases/timeSheet/mark/injection";

import { controllerFindByEmployeeTimeSheet } from "../../useCases/timeSheet/findByTimeSheet/injection";

const timeSheetRouter = Router();

timeSheetRouter.post("/", (req, res) =>
  controllerTimeSheet.mark(req, res)
);
timeSheetRouter.get("/", (req, res) =>
  controllerFindByEmployeeTimeSheet.findTimeSheet(req, res)
);

export { timeSheetRouter };