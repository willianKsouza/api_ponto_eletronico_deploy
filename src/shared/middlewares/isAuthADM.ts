import { NextFunction, Request, Response } from "express";
import { FindByIdRepository } from "../../../prisma/repositories/userRepository";
import { apiError } from "./AppError";

export async function isAuthADM(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const idAdm = req.cookies.securityData.employee_id;
    const isAdm = await new FindByIdRepository().findById(idAdm);
    if (isAdm?.function_employee == "admin") {
      next();
    }
    return res
      .status(403)
      .json({ auth: false, message: "usuario não autorizado" });
  } catch (error) {
    throw new apiError("ocorreu algum erro na autorizaçao", 400);
  }
}
