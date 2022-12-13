import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BAD_REQUEST } from "../utils/errorClass";

export const memberSchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .max(15)
        .required()
        .regex(/^[a-zA-Z, ]*$/, "Alphanumerics"),
      role: Joi.string()
        .optional()
        .regex(/^[a-zA-Z, ]*$/, "Alphanumerics"),
      email: Joi.string()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const result = schema.validate(req.body);

    if (result.error) {
      throw new BAD_REQUEST(result.error.message);
    }
    next();
  } catch (error) {
    next(next(error));
  }
};

export const loginSchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw new BAD_REQUEST(result.error.message);
    }
    next();
  } catch (error) {
    next(next(error));
  }
};

export const bookSchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).max(15).required(),
      author: Joi.string()
        .min(3)
        .max(15)
        .required()
        .regex(/^[a-zA-Z, ]*$/, "Alphanumerics"),
      category: Joi.string()
        .min(3)
        .max(15)
        .required()
        .regex(/^[a-zA-Z, ]*$/, "Alphanumerics"),
      publish_year: Joi.number().required(),
      rating: Joi.number().required().max(10).min(1),
      language: Joi.string()
        .min(3)
        .max(15)
        .required()
        .regex(/^[a-zA-Z, ]*$/, "Alphanumerics"),
      pages: Joi.number().required(),
      cover: Joi.string().optional(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw new BAD_REQUEST(result.error.message);
    }
    next();
  } catch (error) {
    next(next(error));
  }
};

export const updatebookSchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).max(15).optional(),
      author: Joi.string()
        .min(2)
        .max(15)
        .optional()
        .regex(/^[a-zA-Z, ]*$/, "Alphanumerics"),
      category: Joi.string()
        .min(3)
        .max(15)
        .optional()
        .regex(/^[a-zA-Z, ]*$/, "Alphanumerics"),
      publish_year: Joi.number().optional(),
      language: Joi.string()
        .min(2)
        .max(15)
        .optional()
        .regex(/^[a-zA-Z, ]*$/, "Alphanumerics"),
      rating: Joi.number().optional().max(10).min(1),
      pages: Joi.number().optional(),
      cover: Joi.string().optional(),
      availablity: Joi.boolean().optional(),
      lib_book_id: Joi.string().optional(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw new BAD_REQUEST(result.error.message);
    }
    next();
  } catch (error) {
    next(next(error));
  }
};
