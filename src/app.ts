import { Response, Request } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import {
  checkAdminAccess,
  checkMemberAccess,
} from "./middlewares/checkUserAccess";
import { AuthRouter } from "./controllers/authRoutesController";
import { MemberRoutes } from "./controllers/memberRoutesController";
import { AdminRouter } from "./controllers/adminRoutesController";
import { ErrorMessage } from "./utils/errorClass";
import { OpenRoutes } from "./controllers/openRoutesController";

export default function myApp() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  app.use("/api/v1", OpenRoutes);
  app.use("/api/v1/auth", AuthRouter);
  app.use("/api/v1/member", checkMemberAccess, MemberRoutes);
  app.use("/api/v1/admin", checkAdminAccess, AdminRouter);

  app.use("*", async (req: Request, res: Response) => {
    res.status(404).json({
      status: "error",
      statusCode: 404,
      message: ErrorMessage.NOT_FOUND,
      error_detail: `OOPS...! ${req.originalUrl} not found`,
    });
  });
  app.use(errorHandler);
  return app;
}
