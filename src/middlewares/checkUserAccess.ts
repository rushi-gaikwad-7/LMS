import { NextFunction, Request, Response } from "express";
import { FORBIDDEN, UNAUTHORIZED } from "../utils/errorClass";
import { VerifyAccessToken } from "../utils/jwt";

export const checkAdminAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies.access_token) {
      throw new UNAUTHORIZED("please login to access");
    }
    const decoded: any = await VerifyAccessToken(req.cookies.access_token);
    if (decoded.role === "admin") {
      next();
    } else {
      throw new FORBIDDEN("access denied");
    }
  } catch (error) {
    next(next(next(error)));
  }
};

export const checkMemberAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies.access_token) {
      throw new UNAUTHORIZED("please login to access");
    }
    const decoded: any = await VerifyAccessToken(req.cookies.access_token);
    if (decoded.role === "member" || decoded.role === "admin") {
      next();
    } else {
      throw new FORBIDDEN("access denied");
    }
  } catch (error) {
    next(next(next(error)));
  }
};
