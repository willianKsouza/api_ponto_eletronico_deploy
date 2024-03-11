import { Request, Response, NextFunction } from "express";

export class apiError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (
  err: Partial<apiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;

  const errorMessage = err.statusCode ? err.message : "Internal Server Error";

  return res.status(statusCode).json({
    errorMessage,
  });
};
