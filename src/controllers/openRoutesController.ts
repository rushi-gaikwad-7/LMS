import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import crypto from "crypto";
import { book_id_validator } from "../middlewares/paramsValidator";
import { Search_query_Validator } from "../middlewares/queryValidator";
import bookService from "../services/bookServices";
import { logger } from "../utils/logger";

export const OpenRoutes = Router();

const reqId = crypto.randomBytes(3).toString("hex");

OpenRoutes.get(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    const loggerForSearchbooks = logger.child({ reqId }, true);
    loggerForSearchbooks.info({ req: req }, reqId);
    try {
      const books = await bookService.getAllbooks(loggerForSearchbooks);
      loggerForSearchbooks.info(
        { req: req },
        "books fetched successfully",
        reqId
      );
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "books fetched successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);

OpenRoutes.get(
  "/books/search",
  Search_query_Validator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loggerForSearchbooks = logger.child({ reqId }, true);
      const query = req.query.query;
      const books = await bookService.searchBook(query, loggerForSearchbooks);
      res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "books fetched successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);

OpenRoutes.get(
  "/books/:book_id",
  book_id_validator,
  async (req: Request, res: Response, next: NextFunction) => {
    const loggerForSearchbooks = logger.child({ reqId }, true);
    loggerForSearchbooks.info({ req: req }, reqId);
    try {
      const books = await bookService.getSingleBook(
        req.params.book_id,
        loggerForSearchbooks
      );
      res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "book fetched successfully",
        data: books,
      });
      loggerForSearchbooks.info({ res: res }, reqId);
    } catch (error) {
      next(error);
    }
  }
);
