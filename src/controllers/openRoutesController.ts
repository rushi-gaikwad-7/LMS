import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import { book_id_validator } from "../middlewares/paramsValidator";
import { Search_query_Validator } from "../middlewares/queryValidator";
import bookService from "../services/bookServices";
import { randomString } from "../utils/cryptoRandom";
import { logger } from "../utils/logger";

export const OpenRoutes = Router();

OpenRoutes.get(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    const loggerForgetBooks = logger.child(
      { req_id: await randomString() },
      true
    );

    loggerForgetBooks.info({ req: req });
    try {
      const books = await bookService.getAllbooks();

      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "books fetched successfully",
        data: books,
      });
      loggerForgetBooks.info({ res: res });
    } catch (error) {
      loggerForgetBooks.error({ err: error });
      next(error);
    }
  }
);

OpenRoutes.get(
  "/books/search",
  Search_query_Validator,
  async (req: Request, res: Response, next: NextFunction) => {
    const loggerForSearchbooks = logger.child(
      { req_id: await randomString() },
      true
    );
    loggerForSearchbooks.info({ req: req });
    try {
      const query = req.query.query;
      const books = await bookService.searchBook(query);
      res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "books fetched successfully",
        data: books,
      });
      loggerForSearchbooks.info({ res: res });
    } catch (error) {
      loggerForSearchbooks.error({ err: error });
      next(error);
    }
  }
);

OpenRoutes.get(
  "/books/:book_id",
  book_id_validator,
  async (req: Request, res: Response, next: NextFunction) => {
    const loggerForbook_byid = logger.child(
      { req_id: await randomString() },
      true
    );
    loggerForbook_byid.info({ req: req });
    try {
      const books = await bookService.getSingleBook(req.params.book_id);
      res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "book fetched successfully",
        data: books,
      });
      loggerForbook_byid.info({ res: res });
    } catch (error) {
      loggerForbook_byid.error({ err: error });
      next(error);
    }
  }
);
