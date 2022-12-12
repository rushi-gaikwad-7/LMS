import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BAD_REQUEST } from "../utils/errorClass";

export const Search_query_Validator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      query: Joi.string().max(20).min(3).required(),
    });
    const result = schema.validate(req.query);

    if (result.error) {
      throw new BAD_REQUEST(result.error.message);
    }
    next();
  } catch (error) {
    next(next(error));
  }
};
