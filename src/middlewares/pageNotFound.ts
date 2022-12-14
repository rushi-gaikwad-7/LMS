import { ErrorMessage } from "../utils/errorClass";
import { Response, Request } from "express";

export const pageNotFound = async (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: ErrorMessage.NOT_FOUND,
  });
};
