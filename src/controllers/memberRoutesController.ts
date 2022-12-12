import { Response, Request, NextFunction, Router } from "express";
import {
  book_id_validator,
  member_id_validator,
} from "../middlewares/paramsValidator";
import bookService from "../services/bookServices";
import { VerifyAccessToken } from "../utils/jwt";
export const MemberRoutes = Router();

MemberRoutes.post(
  "/loanbook/:book_id",
  book_id_validator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded: any = await VerifyAccessToken(req.cookies.access_token);
      if (decoded) {
        const member_id: any = decoded.member_id;
        await bookService.loanBook(req.params.book_id, member_id);
        res.status(201).json({
          status: "success",
          statusCode: 201,
          message: "book loaned successfully 😊 👌",
          data: [],
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

MemberRoutes.get(
  "/books/:member_id",
  member_id_validator,
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
