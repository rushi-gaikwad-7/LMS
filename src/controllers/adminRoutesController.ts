import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import bookService from "../services/bookServices";
import memberService from "../services/memberServices";
import {
  bookSchemaValidator,
  updatebookSchemaValidator,
} from "../middlewares/schemaValidator";

export const AdminRouter = Router();

AdminRouter.post(
  "/addnewbook",
  bookSchemaValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await bookService.addNewBook(req.body);
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "book added successfully",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }
);
AdminRouter.put(
  "/updatebook/:book_id",
  updatebookSchemaValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await bookService.updateBook(req.params.book_id, req.body);
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "book updated successfully",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }
);
AdminRouter.get(
  "/members",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const members = await memberService.getAllmembers();
      res.status(200).json({
        status: true,
        message: "data fetched successfully",
        data: members,
      });
    } catch (error) {
      next(error);
    }
  }
);
