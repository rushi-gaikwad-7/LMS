import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler";
import {
  checkAdminAccess,
  checkMemberAccess,
} from "./middlewares/checkUserAccess";
import { AuthRouter } from "./controllers/authRoutesController";
import { MemberRoutes } from "./controllers/memberRoutesController";
import { AdminRouter } from "./controllers/adminRoutesController";
import { OpenRoutes } from "./controllers/openRoutesController";
import { pageNotFound } from "./middlewares/pageNotFound";

export default function myApp() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  const swaggerDocument = YAML.load("./swagger.yml");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use("/api/v1", OpenRoutes);
  app.use("/api/v1/auth", AuthRouter);
  app.use("/api/v1/member", checkMemberAccess, MemberRoutes);
  app.use("/api/v1/admin", checkAdminAccess, AdminRouter);

  app.use("*", pageNotFound);
  app.use(errorHandler);
  return app;
}
