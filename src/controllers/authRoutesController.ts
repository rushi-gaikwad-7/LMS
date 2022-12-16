import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import {
  loginSchemaValidator,
  memberSchemaValidator,
} from "../middlewares/schemaValidator";
import authService from "../services/authServices";
import { randomString } from "../utils/cryptoRandom";
import { logger } from "../utils/logger";

export const AuthRouter = Router();

AuthRouter.post(
  "/register",
  memberSchemaValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const gregisterLogs = logger.child({ req_id: await randomString() }, true);
    gregisterLogs.info({ req: req });
    try {
      await authService.addNewMember(req.body);
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "member added successfully",
        data: [],
      });
      gregisterLogs.info({ res: res });
    } catch (error) {
      gregisterLogs.error({ err: error });
      next(error);
    }
  }
);

AuthRouter.post(
  "/login",
  loginSchemaValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const loginLogs = logger.child({ req_id: await randomString() }, true);
    loginLogs.info({ req: req });
    try {
      const token = await authService.login(req.body);
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({
          status: "success",
          statusCode: 200,
          message: "Logged in successfully",
          data: [],
        });
      loginLogs.info({ res: res });
    } catch (error) {
      loginLogs.error({ err: error });
      next(error);
    }
  }
);
