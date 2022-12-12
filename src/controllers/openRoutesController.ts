import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import { uuid_id_Validator } from "../middlewares/paramsValidator";
import { Search_query_Validator } from "../middlewares/queryValidator";
import bookService from "../services/bookServices";

export const OpenRoutes = Router();

OpenRoutes.get(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await bookService.getAllbooks();
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
      const books = await bookService.searchBook(req.params.query);
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
  uuid_id_Validator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await bookService.getSingleBook(req.params.book_id);
      res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "book fetched successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);
