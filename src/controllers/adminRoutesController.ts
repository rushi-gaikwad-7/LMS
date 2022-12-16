import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import bookService from "../services/bookServices";
import memberService from "../services/memberServices";
import {
  bookSchemaValidator,
  updatebookSchemaValidator,
} from "../middlewares/schemaValidator";
import { book_id_validator } from "../middlewares/paramsValidator";
import { randomString } from "../utils/cryptoRandom";
import { logger } from "../utils/logger";

export const AdminRouter = Router();

AdminRouter.post(
  "/addnewbook",
  bookSchemaValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const addBookLogs = logger.child({ req_id: await randomString() }, true);
    addBookLogs.info({ req: req });
    try {
      await bookService.addNewBook(req.body);
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "book added successfully",
        data: [],
      });
      addBookLogs.info({ res: res });
    } catch (error) {
      addBookLogs.error({ err: error });
      next(error);
    }
  }
);

AdminRouter.put(
  "/updatebook/:book_id",
  book_id_validator,
  updatebookSchemaValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const updateBookLogs = logger.child({ req_id: await randomString() }, true);
    updateBookLogs.info({ req: req });
    try {
      await bookService.updateBook(req.params.book_id, req.body);
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "book updated successfully",
        data: [],
      });
      updateBookLogs.info({ res: res });
    } catch (error) {
      updateBookLogs.error({ err: error });
      next(error);
    }
  }
);
AdminRouter.get(
  "/members",
  async (req: Request, res: Response, next: NextFunction) => {
    const getmembersLogs = logger.child({ req_id: await randomString() }, true);
    getmembersLogs.info({ req: req });
    try {
      const members = await memberService.getAllmembers();
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "data fetched successfully",
        data: members,
      });
      getmembersLogs.info({ res: res });
    } catch (error) {
      getmembersLogs.error({ err: error });
      next(error);
    }
  }
);
