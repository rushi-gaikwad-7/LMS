import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import {
  loginSchemaValidator,
  memberSchemaValidator,
} from "../middlewares/schemaValidator";
import authService from "../services/authServices";

export const AuthRouter = Router();

AuthRouter.post(
  "/register",
  memberSchemaValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.addNewMember(req.body);
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "member added successfully",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }
);

AuthRouter.post(
  "/login",
  loginSchemaValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await authService.login(req.body);

      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Logged in successfully 😊 👌",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }
);
