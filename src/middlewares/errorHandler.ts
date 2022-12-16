import { NextFunction, Request, Response } from "express";
import { OperationalError } from "../utils/errorClass";

export const errorHandler = (
  error: OperationalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof OperationalError) {
    return res.status(error.statusCode || 500).json({
      status: "error",
      statusCode: error.statusCode || 500,
      message: error.message || "something went wrong",
    });
  }
};
