import { NextFunction, Request, Response } from "express";
import { ErrorMessage, OperationalError } from "../utils/errorClass";

export const errorHandler = (
  error: OperationalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof OperationalError) {
    return res.status(error.statusCode).json({
      status: "error",
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    // log.error(error);

    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Something went wrong",
    });
  }
};
