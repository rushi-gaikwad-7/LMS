import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BAD_REQUEST } from "../utils/errorClass";

export const book_id_Validator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      book_id: Joi.string().length(36).uuid(),
    });
    const result = schema.validate(req.params);

    if (result.error) {
      throw new BAD_REQUEST(result.error.message);
    }
    next();
  } catch (error) {
    next(next(error));
  }
};
