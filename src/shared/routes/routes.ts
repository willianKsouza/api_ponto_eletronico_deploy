import { Router } from "express";
import { employeeRouter } from "./employeeRouter";
import { loginRouter } from "./loginRouter";
import { avatarRouter } from "./avatarEmployeeRouter";
import { timeSheetRouter } from "./timeSheetRouter";
import { findEmployee } from "./findEmployee";
// import { sendEmailRouter } from "./sendEmailRouter";
import { passwordRouter } from "./passwordRouter";


const routes = Router()


routes.use("/employee", employeeRouter)
routes.use("/findemployee", findEmployee)
routes.use("/login", loginRouter)
routes.use("/avatar", avatarRouter);
routes.use("/timesheet", timeSheetRouter);
// routes.use("/sendemail", sendEmailRouter);
routes.use("/password", passwordRouter);


export { routes };