import { NextFunction, Response, Request } from "express";
import { BAD_REQUEST } from "../utils/errorClass";

export const contentValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.is("application/json") === false &&
      req.headers["content-type"] !== undefined
    ) {
      throw new BAD_REQUEST("Invalid Content type");
    }
    next();
  } catch (error: any) {
    next(error);
  }
};
