import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key: string = process.env.ACCESS_TOKEN_SECRET || "";

export const signInAccessToken = async (payload: any) => {
  return await jwt.sign(payload, secret_key, {
    expiresIn: "1h",
  });
};

export const VerifyAccessToken = async (access_token: string) => {
  return await jwt.verify(access_token, secret_key);
};
