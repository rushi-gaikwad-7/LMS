import { Response, Request, NextFunction, Router } from "express";
import bookService from "../services/bookServices";

export const MemberRoutes = Router();

MemberRoutes.post(
  "/loanbook",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await bookService.loanBook(req.body.member_id, req.body.book_id);
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "book loaned successfully 😊 👌",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }
);

MemberRoutes.get(
  "/books/:member_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await bookService.memberBooks(req.params.member_id);
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
